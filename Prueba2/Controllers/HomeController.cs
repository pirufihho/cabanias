using Newtonsoft.Json.Linq;
using Prueba2.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Configuration;
using System.Web.Mvc;

namespace Prueba2.Controllers
{
    public class HomeController : Controller
    {
        private enum Entorno
        {
            Local,
            Prod
        }

        Entorno _EntornoSet = Entorno.Local;

        private string ConnectionString()
        {
            string ConnString = "";

            switch (_EntornoSet)
            {
                case Entorno.Local:
                    ConnString = "Data Source=FLAVIO-PC\\SQLEXPRESS;Initial Catalog=BDDPrueba;Integrated Security=True;";
                    break;
                case Entorno.Prod:
                    ConnString=WebConfigurationManager.ConnectionStrings["BDDPruebaEntities"].ToString();
                    break;
            }

            return ConnString;

        }

        public ActionResult Index()
        {
            string pUser = "Admin";
            string pPass = "Admin";

            HttpContext.Session["_SessionUser"] = pUser;
            HttpContext.Session["_SessionPass"] = pPass; 

            return View();
        }

        [HttpGet]
        public JsonResult Load()
        {
            var result = new JsonResult();

            string pUser = this.Session["_SessionUser"].ToString();
            string pPass = this.Session["_SessionPass"].ToString();

            try
            {
                List<Cabanias> listaCabanias = new List<Cabanias>();

                using (SqlConnection conn = new SqlConnection(ConnectionString()))
                {
                    conn.Open();

                    using (SqlCommand query = new SqlCommand("select * from Cabanias", conn))
                    {
                        //TODO: May be you have parameters - assign them here...

                        using (var reader = query.ExecuteReader())
                        {
                            while (reader.Read())
                            {
                                Cabanias c = new Cabanias();
                                c.Id = Convert.ToInt32(reader[0]);
                                c.Titulo = reader[1].ToString();
                                c.Descripcion = reader[2].ToString();
                                c.Url = reader[3].ToString();
                                
                                listaCabanias.Add(c);
                            }
                        }
                    }
                }

                result.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
                result.Data = new { Respuesta = listaCabanias };

                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        [HttpPost]
        public JsonResult Insertar(string pTitulo,string pDescripcion,string pUrl)
        {

            var result = new JsonResult();

            try
            {
                SqlConnection conn = new SqlConnection(ConnectionString());

                String query = "INSERT INTO Cabanias (Titulo,Descripcion,Url) VALUES(@Titulo,@Descripcion,@Url)";


                SqlCommand command = new SqlCommand(query, conn);
                command.Parameters.AddWithValue("@Titulo", pTitulo);
                command.Parameters.AddWithValue("@Descripcion", pDescripcion);
                command.Parameters.AddWithValue("@Url", pUrl);

                command.Connection.Open();
                command.ExecuteNonQuery();

                result.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
                result.Data = new { Respuesta = "OK" };

                return result;
            }
            catch (Exception ex)
            {
                result.Data = new { Respuesta = "ERROR" };

                return result;
            }

        }

        [HttpPost]
        public JsonResult Eliminar(int pId)
        {
            var result = new JsonResult();

            try
            {
                SqlConnection conn = new SqlConnection(ConnectionString());

                String query = "DELETE FROM Cabanias WHERE Id=@Id;";

                SqlCommand command = new SqlCommand(query, conn);
                command.Parameters.AddWithValue("@Id", pId);

                command.Connection.Open();
                command.ExecuteNonQuery();

                result.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
                result.Data = new { Respuesta = "OK" };

                return result;
            }
            catch (Exception ex)
            {
                result.Data = new { Respuesta = "ERROR" };

                return result;
            }

        }

        [HttpPost]
        public JsonResult Editar(int pId,string pDescripcion,string pTitulo,string pUrl)
        {
            var result = new JsonResult();

            try
            {
                SqlConnection conn = new SqlConnection(ConnectionString());

                String query = "UPDATE Cabanias SET Titulo = @Titulo, Descripcion = @Descripcion, Url = @Url WHERE Id=@Id;";


                SqlCommand command = new SqlCommand(query, conn);
                command.Parameters.AddWithValue("@Id", pId);
                command.Parameters.AddWithValue("@Descripcion", pDescripcion);
                command.Parameters.AddWithValue("@Titulo", pTitulo);
                command.Parameters.AddWithValue("@Url", pUrl);

                command.Connection.Open();
                command.ExecuteNonQuery();

                result.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
                result.Data = new { Respuesta = "OK" };

                return result;
            }
            catch (Exception ex)
            {
                result.Data = new { Respuesta = "ERROR" };

                return result;
            }
        }

        

    }
}
