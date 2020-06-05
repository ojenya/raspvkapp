const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://j3nqa:093zheka4067@cluster0-ksudn.gcp.mongodb.net/schedule?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });

class Api {
    getGroup = () => {
        const group = []
        client.connect(err => {
            const collection = client.db("schedule").collection("group");
            collection.find({ course: "3" }).toArray(function(err, results) {
                group.push(results)
            });

            client.close();
        });
        console.log(group)
        return group
    }
}

const apiGetGroup = new Api().getGroup()
export default apiGetGroup