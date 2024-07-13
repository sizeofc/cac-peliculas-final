package com.egg.proyecto_final.controller;

import com.egg.proyecto_final.dao.UsuarioDAO;
import com.egg.proyecto_final.modelo.Usuario;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.sql.SQLException;

@WebServlet("/login")
public class LoginServlet extends HttpServlet {

    private UsuarioDAO usuarioDAO = new UsuarioDAO();

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String email = request.getParameter("email");
        String password = request.getParameter("password");

        try {
            // Obtener usuario por email
            Usuario usuario = usuarioDAO.usuarioPorEmail(email);

            if (usuario != null && usuario.getEmail().equals("admin@admin.com") && usuario.getPassword().equals(password)) {
                // Guardar sesión de usuario autenticado
                HttpSession session = request.getSession();
                session.setAttribute("email", email);

                // Enviar el nombre de usuario al cliente como respuesta JSON
                response.setContentType("application/json");
                response.setCharacterEncoding("UTF-8");
                String nombreUsuario = usuario.getNombre();  // Suponiendo que el nombre está en tu objeto Usuario
                response.getWriter().write("{\"usuario\": \"" + nombreUsuario + "\"}");

                response.sendRedirect(request.getContextPath() + "/usuarios.html?usuario=" + usuario.getNombre());
            } else {
                if (usuario.getEmail().equals(email) && usuario.getPassword().equals(password)) {
                    response.sendRedirect(request.getContextPath() + "/index.html?usuario=" + usuario.getNombre());
                } else 
                    // Enviar mensaje de error o redirigir a una página de error de login
                    response.sendRedirect(request.getContextPath() + "/iniciosesion.html?error=invalid");
                }
            }catch (SQLException e) {
            e.printStackTrace();
            response.sendRedirect(request.getContextPath() + "/iniciosesion.html?error=db");
        }
        }
    
}
