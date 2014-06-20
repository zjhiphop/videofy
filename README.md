videofy
=======

Covert animated gif to mp4.


Why?
====
* Inspired from twitter gif comment function
* MP4 video is much smaller than Gif, nearlly 10 times smaller

![Source File](https://github.com/zjhiphop/videofy/raw/master/tmp/test.gif)
> Source file 627KB

<video src="https://github.com/zjhiphop/videofy/raw/master/tmp/test-mp4.mp4" controls autoplay><a href="https://github.com/zjhiphop/videofy/raw/master/tmp/test-mp4.mp4">Source Video</a></video> 
> Target File 26KB

* User can control the speed of video

Example
=======

```
videofy('input.gif', 'output.mp4', function(error) {
	

})
```

Equally with
============
```
convert input.gif tmp_%05d.jpg
ffmpeg -f image2 -r 5 -i tmp_%05d.jpg -c:v libx264 output.mp4
```


Dependency
==========
The system must install [ffmpeg](https://www.ffmpeg.org/) and [imagemagick](http://www.imagemagick.org/)
