import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Home from "../pages/Home";
import { vi, describe, test, beforeEach, expect } from "vitest";

vi.mock("../api/useApi");

import { useApi } from "../api/useApi";

describe("Home page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("muestra título, tareas de API y permite crear nueva tarea", async () => {
    const mockGetUserTasks = vi.fn().mockResolvedValue({
      data: [{ id: 1, title: "Tarea 1", description: "Desc 1", status: false }],
    });
    const mockCreateTask = vi.fn().mockResolvedValue({ status: 201 });

    useApi.mockReturnValue({
      getUserTasks: mockGetUserTasks,
      createTask: mockCreateTask,
    });

    render(<Home />);

    expect(screen.getByText(/tareas pendientes/i)).toBeInTheDocument();

    expect(await screen.findByText("Tarea 1")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /nueva tarea/i }));

    const titleInput = screen.getByPlaceholderText(/titulo de la tarea/i);
    const descInput = screen.getByPlaceholderText(/descripcion de la tarea/i);

    fireEvent.change(titleInput, { target: { value: "Tarea 2" } });
    fireEvent.change(descInput, { target: { value: "Desc 2" } });

    fireEvent.click(screen.getByText("✓"));

    await waitFor(() =>
      expect(mockCreateTask).toHaveBeenCalledWith(
        expect.objectContaining({ title: "Tarea 2", description: "Desc 2" })
      )
    );

    expect(await screen.findByText("Tarea 2")).toBeInTheDocument();
  });
});
