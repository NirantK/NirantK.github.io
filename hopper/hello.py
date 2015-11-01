from flask import Flask
from flask_restful import reqparse, abort, Resource, Api

app = Flask(__name__)
api = Api(app)

clusterDict = {}
with open("keyword_clustering_sample.csv", 'rb') as f:
	for line in f:
		cluster = line.strip().split(',')
		clusterDict[cluster[0]] = cluster[1:]

def abort_if_query_doesnt_exist(query):
    if query not in clusterDict:
        abort(404, message="Cluster not found. Please try some related keyword.".format(query))

parser = reqparse.RequestParser()
parser.add_argument('task', type=str)

class Hopper(Resource):
	# '''Main IO Class'''
    def get(self, query):
       	abort_if_query_doesnt_exist(query)
       	result = clusterDict[query]

    def put(self, query, keywordList):
    	'''Modify this function to allow addition to clusters via API'''
        args = parser.parse_args()
        task = {query.lower():keywordList}
        clusterDict[query.lower()] = task
        return task, 201
    
    # def put(self, query):
    # 	query = query.lower()

class keywordList(Resource):
    def get(self):
        return clusterDict

# api.add_resource(HelloWorld, '/')
api.add_resource(keywordList, '/hopper')
api.add_resource(Hopper, '/hopper/<query>')

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')