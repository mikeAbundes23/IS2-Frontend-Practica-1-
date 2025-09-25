import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Register from "../pages/Register";
import { useApi } from "../api/useApi";
import { vi, describe, test, beforeEach, expect } from "vitest";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock("../api/useApi");

describe("Register page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    window.alert = vi.fn();
  });

  test("envía datos, llama a createUser y navega a /login si status 201", async () => {
    const mockCreateUser = vi.fn().mockResolvedValue({ status: 201 });
    useApi.mockReturnValue({ createUser: mockCreateUser });

    render(<Register />);

    fireEvent.change(screen.getByPlaceholderText(/Nombre/i), {
      target: { value: "Alexbri" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Apellido/i), {
      target: { value: "Lol" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Correo electrónico/i), {
      target: { value: "sulexbri@gmail.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Contraseña/i), {
      target: { value: "password" },
    });

    const submitBtn = screen.getByRole("button", { name: /registrarse/i });
    fireEvent.click(submitBtn);

    await waitFor(() => expect(mockCreateUser).toHaveBeenCalled());

    expect(window.alert).toHaveBeenCalledWith(
      "Usuario registrado con éxito. Ahora puedes iniciar sesión."
    );
    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });
});
