import { describe, it, expect, vi } from "vitest";

vi.mock("../firebase/customerService", () => ({
  createCustomer: vi.fn(),
  getCustomers: vi.fn(),
}));

import {
  createCustomer,
  getCustomers,
} from "../firebase/customerService";

describe("customerService", () => {
  it("creates a customer", async () => {
    createCustomer.mockResolvedValue({ id: "123" });

    const result = await createCustomer({
      name: "John Doe",
    });

    expect(createCustomer).toHaveBeenCalledTimes(1);
    expect(result).toEqual({ id: "123" });
  });

  it("gets customers", async () => {
    const mockData = [
      { id: "1", name: "Alice" },
      { id: "2", name: "Bob" },
    ];

    getCustomers.mockResolvedValue(mockData);

    const result = await getCustomers();

    expect(getCustomers).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockData);
  });
});