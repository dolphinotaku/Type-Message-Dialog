# Type-Message-Dialog
simple and quick solution to present the caption/subtitle for recording a presentation

## Demo
[Demo](https://keithbox.github.io/Type-Message-Dialog/test/typedjs.html)

## Motivation
Sometime I need to present the PowerPoint slides and demonstrate the applications. Typing the speech on a text editor is a quick and simple method if I don't want to speak. To be honest, English is not my native language, therefore, I will prepare the speech in hard copy, then follow and type it on the show. It was very complicated, low efficiency, easy to having typo and easy to overlook.

I start from [gitgist](https://gist.github.com/keithbox/512470d8ee23275e7f5146cdb2ffe66b) to solve this situation, what is challenging to me may be a breeze for you.

## Investigation
I experienced several similar tools: 
- [ASS](https://github.com/weizhenye/ASS)
- [typed.js](https://github.com/mattboldt/typed.js)
- [typewriterjs](https://github.com/tameemsafi/typewriterjs)

Typed.js is the most closely related to my needs.

## User Requirment
- The text store in a plain text file(txt)
- Time factor will not implement to keep it simple to produce than .ass file
- To fit the display timing without time properties, start/show next line of text/message when click on the container
- A short-cut to display the typing line of text/message at once
- Provide start/pasue/auto option
  - Start
    - Click to start the typing
    - Press button to start the typing
  - Pasue
    - Pasue on typing (may be pause intimately or pause after a line was typed)
  - Auto
    - Auto show next line until End
- Enrich message format, size/color

## Dependency
- jQuery 3.3.1 in used
- Typed.js v2.0.9

## Function
- [x] Read a text file, display text in terms of line break
- [x] Click on the area to start to display the next line
- [x] Long press on the area to display the full message of the typing line at once
- [x] Start button
- [x] Pasue button
- [x] Typed.js library native allowed to embed html to and display

- [ ] Auto button
- [ ] Integrate with wysiwyg to reduce the effort on formating the message, provide different size, color and others in a line
- [ ] May be remove the jQuery dependency

## Contributing
Please do not hesitate to perform your professional on PULL requests when you found out some current insufficient. Please raise your ideas which you think for enhance the functionalities, flexibility and usability, improve this little tool are much welcome. I will follow up the pull requests and issues when free.

## License
This project is licensed under the MIT license. [View license file](https://github.com/keithbox/AngularJS-CRUD-PHP/blob/master/LICENSE)

Enjoy and have fun =]
