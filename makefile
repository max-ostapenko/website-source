render:
	quarto render

publish:
	clean
    quarto publish

clean:
	rm -rf _site/
	rm -rf _freeze/

