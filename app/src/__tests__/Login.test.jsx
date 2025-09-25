import { render, screen, fireEvent } from "@testing-library/react";
import Login from "../pages/Login";
import AuthContext from "../context/AuthContext";
import { MemoryRouter } from "react-router-dom";
import { vi, describe, test, expect } from "vitest";

describe("Login page", () => {
  test("llama a loginUser al enviar el formulario", () => {
    const mockLoginUser = vi.fn(
      (e) => e && e.preventDefault && e.preventDefault()
    );

    render(
      <AuthContext.Provider value={{ loginUser: mockLoginUser, user: null }}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    fireEvent.change(screen.getByPlaceholderText(/correo electrónico/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/contraseña/i), {
      target: { value: "1234" },
    });

    fireEvent.click(screen.getByRole("button", { name: /entrar/i }));

    expect(mockLoginUser).toHaveBeenCalled();
  });
});
