use comision;

desc empleados;
insert into empleados (nombre,puesto,salario,fecha_contratacion,email)
values ('Juan Perez','Gerente',750000.50,'2015-06-01','juan.perez@ejemplo.com');

select * from empleados;
select nombre,puesto,fecha_contratacion from empleados;

update empleados set puesto = 'Director' where id = 1;

delete from empleados where id = 1;
-- --------------------------------------------------------------------
INSERT INTO empleados (nombre, puesto, salario, fecha_contratacion, email) VALUES
('Juan Pérez', 'Gerente', 75000.00, '2015-06-01', 'juan.perez@example.com'),
('Ana García', 'Desarrollador', 60000.00, '2017-03-15', 'ana.garcia@example.com'),
('Luis Martínez', 'Analista', 55000.00, '2018-07-20', 'luis.martinez@example.com'),
('María López', 'Desarrollador', 60000.00, '2019-10-05', 'maria.lopez@example.com'),
('Carlos Gómez', 'Administrador de BD', 65000.00, '2020-01-10', 'carlos.gomez@example.com'),
('Elena Fernández', 'Gerente', 80000.00, '2016-11-30', 'elena.fernandez@example.com'),
('Jorge Sánchez', 'Soporte Técnico', 45000.00, '2021-05-25', 'jorge.sanchez@example.com'),
('Laura Díaz', 'Desarrollador', 60000.00, '2019-08-18', 'laura.diaz@example.com'),
('David Ruiz', 'Analista', 55000.00, '2022-03-22', 'david.ruiz@example.com'),
('Sara Torres', 'Consultor', 70000.00, '2018-12-01', 'sara.torres@example.com'),
('Alejandro Ramírez', 'Desarrollador', 62000.00, '2022-09-15', 'alejandro.ramirez@example.com'),
('Sofía Guzmán', 'Analista', 58000.00, '2021-02-01', 'sofia.guzman@example.com'),
('Javier Herrera', 'Soporte Técnico', 47000.00, '2020-07-10', 'javier.herrera@example.com'),
('Carla Navarro', 'Gerente', 82000.00, '2018-04-20', 'carla.navarro@example.com'),
('Miguel Castillo', 'Consultor', 75000.00, '2023-01-05', 'miguel.castillo@example.com');

select nombre,email from empleados where puesto = 'Gerente';
select nombre,email,salario from empleados where puesto = 'Gerente' and salario > 75000;
select * from empleados
where fecha_contratacion > '2020-01-01' and salario between 55000 and 70000;

-- FUNCIONES:herramientas que realizan operaciones especificas en los datos
-- count():contamos numero de filas que cumplen una condicion
select count(*) as total_empleados from empleados; 

-- sum():se utiliza para calcular la suma de los valores de una columna en especifico
select sum(salario) as total_salarios from empleados; 

-- AVG(): se utiliza para calcular el promedio de los valores de una columna específica.
SELECT AVG(salario) AS salario_promedio
FROM empleados;

-- MAX() y MIN(): se utilizan para obtener el valor máximo y mínimo
SELECT MAX(salario) AS salario_maximo, MIN(salario) AS salario_minimo
FROM empleados;

-- GROUP BY: Es una cláusula que agrupa filas con valores iguales en columnas especificadas
-- cantidad de empleados por puesto
select puesto,count(*) as num_empleados from empleados
group by puesto;

select puesto, count(*) as cantidad from empleados group by puesto
ORDER BY cantidad asc;

-- salario maximo/minimo/promedio/numero de empleados agrupados por puesto
SELECT 
    puesto,
    MAX(salario) AS salario_maximo,
    MIN(salario) AS salario_minimo,
    AVG(salario) AS salario_promedio,
    COUNT(*) AS num_empleados
FROM empleados
GROUP BY puesto;

-- HAVING: Es una cláusula que filtra los resultados de GROUP BY según una condición específica
-- grupos que tienen más de 2 empleados
SELECT puesto
FROM empleados
GROUP BY puesto
HAVING COUNT(*) > 2;

-- SUBCONSULTAS:
-- Son consultas SQL ubicadas dentro de otra consulta.
-- Pueden ser usadas en las cláusulas SELECT, FROM, WHERE, y HAVING.
-- En la cláusula SELECT:
-- Selecciona el nombre, puesto y salario de cada empleado,
-- y también calcula el salario promedio de su puesto utilizando una subconsulta en la cláusula SELECT.
SELECT 
    e.nombre,
    e.puesto,
    e.salario,
    (SELECT AVG(salario) FROM empleados WHERE puesto = e.puesto) AS salario_promedio_puesto
FROM empleados e;

-- Subconsulta en la cláusula FROM:
-- Calcula el salario promedio por puesto,
-- pero solo para los empleados contratados después del 1 de enero de 2020
SELECT puesto, salario FROM empleados WHERE fecha_contratacion > '2020-01-01';

SELECT puesto,AVG(salario) AS salario_promedio
FROM empleados
GROUP BY puesto;

SELECT 
    puesto,
    AVG(salario) AS salario_promedio
FROM 
    (SELECT puesto, salario FROM empleados WHERE fecha_contratacion > '2020-01-01') AS empleados_recientes
GROUP BY puesto;

-- En la cláusula WHERE:
-- Nombres, puestos y salarios de los empleados que tienen
-- un salario superior al salario promedio de los desarrolladores,
-- ordenados por puesto.

SELECT nombre, puesto, salario
FROM empleados
WHERE salario > (
    SELECT AVG(salario)
    FROM empleados
    WHERE puesto = 'Desarrollador'
)
ORDER BY puesto;

-- En la cláusula HAVING:
-- calcula el salario promedio por puesto y muestra solo los puestos 
-- que tienen un salario promedio superior al salario promedio general de todos los empleados
SELECT puesto, AVG(salario) AS salario_promedio
FROM empleados
GROUP BY puesto
HAVING AVG(salario) > (
    SELECT AVG(salario)
    FROM empleados
);
