/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.egg.proyecto_final.controller;

import com.egg.proyecto_final.dao.UsuarioDAO;
import com.egg.proyecto_final.modelo.Usuario;
import com.google.gson.Gson;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.util.List;
import javax.servlet.http.HttpSession;

@WebServlet("/usuarios")
public class UsuarioServlet extends HttpServlet {

    private UsuarioDAO usuarioDAO = new UsuarioDAO();
    private Gson gson = new Gson();

    
    
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // Verificar si el usuario está autenticado
        HttpSession session = request.getSession(false);
        if (session == null || session.getAttribute("email") == null || !session.getAttribute("email").equals("admin@admin.com")) {
            // Si no está autenticado como admin@admin.com, redirigir a una página de acceso denegado o login
            response.sendRedirect(request.getContextPath() + "/acceso-denegado.html");
            return;
        }

        try {
            List<Usuario> usuarios = usuarioDAO.obtenerTodos();
            String usuariosJson = gson.toJson(usuarios);
            response.setContentType("application/json");
            PrintWriter out = response.getWriter();
            out.print(usuariosJson);
            out.flush();
        } catch (SQLException e) {
            e.printStackTrace();
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        try {
            int id = Integer.parseInt(request.getParameter("id"));
            usuarioDAO.eliminar(id);
            response.setStatus(HttpServletResponse.SC_OK);
        } catch (SQLException e) {
            e.printStackTrace();
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
        }
    }

}
