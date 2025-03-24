var imageIndex = 1;
var image = document.getElementsByClassName("slides"); //grabs all images with this class name

//called when either the previous or back button is clicked and it triggers the manual slide
function imageSlideToggle(n)
{
	imageIndex++;
	manualSlide(imageIndex);
}
manualSlide(1);

//displays the next/previous image depending on button clicked - hide current, display next
function manualSlide(n)
{
	if(n > image.length){imageIndex = 1}; //once end reached, go back to beginning
	if(n < 1){imageIndex = image.length};
	
	for(var i=0; i<image.length; i++)
	{
		image[i].style.display = "none";
	}
	image[imageIndex-1].style.display = "block";
}

//called upon loading page - loops through all images w/ class name "slides"
function autoSlide()
{
	for(var i=0; i<image.length; i++)
	{
		image[i].style.display = "none";
	}
	
	//displays each image and wait x seconds before loading the next one
	imageIndex++;
	if(imageIndex > image.length) {imageIndex = 1;}
	image[imageIndex-1].style.display = "block";
	setTimeout(autoSlide, 3000);
}
autoSlide();
