/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.egg.proyecto_final.controller;

/**
 *
 * @author Alexi
 */
import com.egg.proyecto_final.dao.UsuarioDAO;
import com.egg.proyecto_final.modelo.Usuario;
import com.google.gson.Gson;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.SQLException;

@WebServlet("/usuario")
public class ObtenerUsuarioServlet extends HttpServlet {

    private UsuarioDAO usuarioDAO = new UsuarioDAO();
    private Gson gson = new Gson();

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        try {
            int id = Integer.parseInt(request.getParameter("id"));
            Usuario usuario = usuarioDAO.obtenerPorId(id);
            String usuarioJson = gson.toJson(usuario);
            response.setContentType("application/json");
            response.getWriter().write(usuarioJson);
        } catch (SQLException e) {
            e.printStackTrace();
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    protected void doPut(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        try {
            Usuario usuario = gson.fromJson(request.getReader(), Usuario.class);

            // Convertir java.util.Date a java.sql.Date
            java.util.Date fechaUtil = usuario.getFechaNacimiento();
            java.sql.Date fechaSql = new java.sql.Date(fechaUtil.getTime());
            usuario.setFechaNacimiento(fechaSql);

            usuarioDAO.modificar(usuario);
            response.setContentType("application/json");
            response.getWriter().write(gson.toJson(usuario));
            response.setStatus(HttpServletResponse.SC_OK);

        } catch (SQLException e) {
            e.printStackTrace();
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
        }
    }
}
