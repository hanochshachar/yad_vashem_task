using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using yadvashem.models;
using static System.Net.Mime.MediaTypeNames;
using System.IO;




// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace yadvashem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CollectionController : ControllerBase
    {
        

        // GET: api/<CollectionController>
        [HttpGet]
        [Route("getCollection/{collNum}")]
        public  Collections  getCollection(string collNum)
        {
            return GetCollection.getCollections(collNum);
        }

        
        

        [HttpGet]
        [Route("getPath/{collNu}")]
        public IActionResult GetPath(string collNu)
        {
            var path = Path.Combine(@"C:\Users\97255\source\repos\yadvashem\yadvashem\images", collNu);
            var pathToReturn = Path.Combine(@"images", collNu);

            if (!Directory.Exists(path))
            {
                Directory.CreateDirectory(path);
            }

            if (Directory.GetFiles(path).Any())
            {
                var maxNum = Directory.GetFiles(path)
                    .Select(file => Path.GetFileNameWithoutExtension(file))
                    .Where(name => int.TryParse(name, out _))
                    .Select(name => int.Parse(name))
                    .DefaultIfEmpty(0)
                    .Max();

                var responsePath = Path.Combine(pathToReturn, (maxNum + 1).ToString());

                return new JsonResult(new { Path = responsePath });
            }
            else
            {
                var responsePath = Path.Combine(pathToReturn, "1");

                return new JsonResult(new { Path = responsePath });
            }
        }


        // POST api/<CollectionController>
        [HttpPost]
        [Route("AddFile")]
        public IActionResult AddFile([FromBody] TwoArr data)
        {
            string firstPath = data.pathArr[1];
            int startIndex = firstPath.IndexOf('/') + 1;

            
            int endIndex = firstPath.IndexOf('/', startIndex);

            
            if (endIndex >= startIndex)
            {
                
                int length = endIndex - startIndex;

               
                string collNum = firstPath.Substring(startIndex, length);

                Collections coll = GetCollection.getCollections(collNum);

                string fileEnd = ".text";

                List<string[]> result = new List<string[]>();

                foreach (string str1 in data.pathArr)
                {
                    string lastChar1 = str1.Substring(str1.Length - 1);
                    bool foundMatch = false;

                    foreach (string str2 in data.backPathArr)
                    {
                        string lastChar2 = str2.Substring(str2.Length - 1);

                        if (lastChar1 == lastChar2)
                        {
                            result.Add(new string[] { str1 + fileEnd, str2 + fileEnd });
                            foundMatch = true;
                            break;
                        }
                    }

                    if (!foundMatch)
                    {
                        result.Add(new string[] { str1 + fileEnd });
                    }
                }

                string startFilePath = @"C:\Users\97255\source\repos\yadvashem\yadvashem\";
                foreach (string[] arrOfPath in result)
                {
                    string lastChar = arrOfPath[0].Substring(arrOfPath[0].Length - 1);

                    StreamWriter sw = new StreamWriter(startFilePath + arrOfPath[0]);
                    sw.WriteLine(coll.CollectionSymbolization);
                    sw.WriteLine(coll.title);
                    sw.WriteLine(lastChar);
                    sw.WriteLine(arrOfPath);
                    sw.Close();
                }

                return Ok(new { message = "work" });
            }
            else
            {
                
                return BadRequest("Second occurrence of '/' not found in the path.");
            }
        }


        // PUT api/<CollectionController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<CollectionController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
