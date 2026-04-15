import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("./firebase", () => ({
  db: {},
}));

vi.mock("firebase/firestore", () => ({
  collection: vi.fn(),
  addDoc: vi.fn(),
  getDocs: vi.fn(),
  doc: vi.fn(),
  updateDoc: vi.fn(),
  getDoc: vi.fn(),
  serverTimestamp: vi.fn(() => "TIMESTAMP"),
}));

import {
  createCustomer,
  getCustomers,
  getCustomerById,
  updateCustomer,
} from "../customerService";

import {
  addDoc,
  getDocs,
  getDoc,
  updateDoc,
  collection,
  doc,
} from "firebase/firestore";

describe("customerService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // ─────────────────────────────
  it("creates a customer with active + timestamp", async () => {
    addDoc.mockResolvedValueOnce({ id: "123" });
    collection.mockReturnValue("customersRef");

    const data = {
      name: "John",
      email: "john@test.com",
    };

    await createCustomer(data);

    expect(addDoc).toHaveBeenCalledWith(
      "customersRef",
      expect.objectContaining({
        name: "John",
        email: "john@test.com",
        active: true,
        createdAt: "TIMESTAMP",
      })
    );
  });

  // ─────────────────────────────
  it("gets all customers", async () => {
    getDocs.mockResolvedValueOnce({
      docs: [
        {
          id: "1",
          data: () => ({ name: "A" }),
        },
        {
          id: "2",
          data: () => ({ name: "B" }),
        },
      ],
    });

    const result = await getCustomers();

    expect(result).toEqual([
      { id: "1", name: "A" },
      { id: "2", name: "B" },
    ]);
  });

  // ─────────────────────────────
  it("gets customer by id (exists)", async () => {
    getDoc.mockResolvedValueOnce({
      exists: () => true,
      id: "123",
      data: () => ({ name: "John" }),
    });

    const result = await getCustomerById("123");

    expect(doc).toHaveBeenCalled();
    expect(result).toEqual({
      id: "123",
      name: "John",
    });
  });

  // ─────────────────────────────
  it("returns null if customer does not exist", async () => {
    getDoc.mockResolvedValueOnce({
      exists: () => false,
    });

    const result = await getCustomerById("999");

    expect(result).toBeNull();
  });

  // ─────────────────────────────
  it("updates customer without createdAt and adds updatedAt", async () => {
    doc.mockReturnValue("docRef");

    const data = {
      name: "Updated",
      createdAt: "OLD",
    };

    await updateCustomer("123", data);

    expect(updateDoc).toHaveBeenCalledWith(
      "docRef",
      expect.objectContaining({
        name: "Updated",
        updatedAt: "TIMESTAMP",
      })
    );
  });
});