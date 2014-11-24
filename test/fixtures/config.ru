app = proc do |env|
	  [ 200, {'Content-Type' => 'text/plain'}, ["a"] ]
end

run app
