using Newtonsoft.Json;

namespace yadvashem.models
{
    public class  GetCollection
    {
        public static Collections getCollections(string collNum) 
        {
            var jsonText = File.ReadAllText("C:\\Users\\97255\\source\\repos\\yadvashem\\yadvashem\\collections.text");
            var coll = JsonConvert.DeserializeObject<IList<Collections>>(jsonText);
            var collObj = coll.FirstOrDefault(x => x.CollectionSymbolization == collNum);
            
            return (Collections)collObj;
        }
        
    }
}
