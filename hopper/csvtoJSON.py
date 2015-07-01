with open("keyword_clustering_sample.csv", 'rb') as f:
	my_object = {}
	for line in f:
		cluster = line.strip().split(',')
		my_object[cluster[0]] = cluster[1:]
	print my_object