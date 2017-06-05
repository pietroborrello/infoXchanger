"use strict";

/**
 * @author of QRWebScanner - Sergey Illarionov <easthunch@gmail.com>
 * @author of QRWebScannerEngine - Lazar Laszlo <lazarsoft@gmail.com>
 */

var QRWebScanner = (function () {

    var appBox = false,
        canvasBox = false,
        videoBox = false,
        resultBox = false,
        resultData = false,
        callbackData = false,
        btnsBox = false,
        btnCam = false,
        btnImg = false,
        inputFile = false,
        labelFile = false,
        imgProgressBar = false,

    settings = {
            width: 320,
            height: 240,
            id: {
                appBox: 'qrApp',
                inputFile: 'qrInputFile'
            },
            elClass: {
                btnsBox: 'qrBtns',
                btnCam: 'qrBtnCam',
                btnImg: 'qrBtnImg',
                videoBox: 'qrVideo',
                canvasBox: 'qrCanvas',
                resultBox: 'qrResult'
            },
            btnCamBG: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAA3NCSVQICAjb4U/gAAAACXBIWXMAAARuAAAEbgHQo7JoAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAALFQTFRF////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGBgAGBgAGBQAFBAAEBAAEAwADAwADAwADAwADAwADAwADAwAFAwAFAgAFAgAFAgAEAgAEBAIEAwIDAwIDAwIDAwIDAwIDAwIFAwEEAwEEAwEEAwEEAwEEAwEEAwEEAwEEAwEEAgEEAgEEBAEEAwEDAwEFAwEEAwEEAwEEAwEEAwEEAwEEAwEEAwEEAwEEAwEEneEDTwAAADp0Uk5TAAEFDQ4RFhgaHCotLjhBRUpMTk9UXWFkbG96foGUl5iZnKGrrK6vsbK0vMLP0NXb4uTl5ufv+fr7/i/djPQAAAD+SURBVBgZvcHVcsIAFEXRTXGX4NKixYJL4fz/hzXDXEKAgUfWgg9KTha+SZJnSwUseZLSnRSPWrrT4kH5oDuHMibUWOmlVSNEQ0Gb8XijoAYr+Y7NOJ548yjfCvncNCbtyrNxfiWhq10UTyyGJ7qTNMSRhK6KQG0trWtAUdLfcCMJmRHQ0UUHGMkgU4e8TB7qMshk4UfmG7IyyIRhLjOHsAwyGejL9CEjg0wVKjIVqMog04XQTBezEHRlkDlmINKTpxeBzFEGXblfQKJUSgBfrq6QbxDFRAfyoZttgYvCVjecFLCfttvTvQJOLPTWAuesN84O5Abu4gV3kOMD/gGpEoZr1YvY2wAAAABJRU5ErkJggg==',
            btnImgBG: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAABZwAAAWcBcp21pQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAF1SURBVFiF7ZexSsRAEIa/iSkiVxwWonIq14hgoY0+gIhvYOcraGNndwdWtpYWgq8g2giCduILeCCneCAoaKuFMhZJIKy3Zo25rIULfzG7s/t/yewuiagqPlvg1f0vAAjQApqe/O8E8LoJvJcgNOJN4L0Cz700MEswrKpvg3QXkQh4TePSSyAigYg0XPNLBRCRNeAW6InIqYiMuszTjCJVpYiSh+ka6233yYuyOWW+gRFgyuibz5tUGoCqPgNHRveB01wcSgCEDmWoAxvAIbBiyYkMz3wAoAHcALNF90hhAGAIuEjGO0C9aoAdI+cECCoBAFaBDyNHgd0cky1g6VcAwATw2Mc81bqlXPvJ+AuwUAiA+HiefWOuxPf5YmbhGnBs5DwBc0UAWjnmqXrAODAGXFlyHoAZZwBg2VJ3my75egWbugeaLgDTCbGr+U/UBSbzAM4HZJ6qQ/z9aQWoQtfZ+P+j1DtACLTx+WOSnE1vzXsJvAN8AkFqiiajd3okAAAAAElFTkSuQmCC',
            imgProgressBarSRC:'data:image/gif;base64,R0lGODlhXgAPAKEDAJqamsXFxebm5v///yH/C05FVFNDQVBFMi4wAwEAAAAh/hVDcmVhdGVkIHdpdGggVGhlIEdJTVAAIfkEBQoAAwAsAAAAAF4ADwAAAoGcj6nL7Q+jnLTai7PeTfgPHuAoiORnnqWheul5APJMK+063C+5j33IasVoRJswqPqhkDAmz+kzAKbUqjEJBeaOW2y3+X0OqmTAFazLLsNRtjY9LlPPYride/fK54k8Gg/oBbc3RdfmVxf4p0do+KaYKAjZRmjGcYmZqbnJ2enpWQAAIfkEBQoAAwAsRAADABcACQAAAh+Ej6PB7QiBGq6GmJZt+MzNdZIGiiMFXuKXmmy5klsBACH5BAUKAAMALDcAAwAkAAkAAAI0hI+jwe06hJwUWQCdDpB6cSXL1nTfFB4ZyZgnmGIj656xPLCt8kr3SuP1fjNS7UPM6Y6eAgAh+QQFCgADACwqAAMAJAAJAAACNISPo8HtOoScFFkAnQ6QenEly9Z03xQeGcmYJ5hiI+uesTywrfJK90rj9X4zUu1DzOmOngIAIfkEBQoAAwAsHQADACQACQAAAjSEj6PB7TqEnBRZAJ0OkHpxJcvWdN8UHhnJmCeYYiPrnrE8sK3ySvdK4/V+M1LtQ8zpjp4CACH5BAUKAAMALBAAAwAkAAkAAAI0hI+jwe06hJwUWQCdDpB6cSXL1nTfFB4ZyZgnmGIj656xPLCt8kr3SuP1fjNS7UPM6Y6eAgAh+QQFCgADACwDAAMAJAAJAAACLYSPo8LtOpwUqAI438rMps1hHOUZYghmpZlOp7q+biutF61Foy1LvcPDNX6NAgAh+QQFCgADACwDAAMAFwAJAAACH4yPo8DtCIMaroKYlm34zM11kgaKIwVe4peabLmSWwEAIfkEBQoAAwAsAwADACQACQAAAjSUj6PB7TqAnBRZAZ0OkHpwJcvWdN8UHhnJmCeYYiPrnrE8sK3ySvdK4/V+M1LtQ8zpjp4CACH5BAUKAAMALBAAAwAkAAkAAAI0lI+jwe06gJwUWQGdDpB6cCXL1nTfFB4ZyZgnmGIj656xPLCt8kr3SuP1fjNS7UPM6Y6eAgAh+QQFCgADACwdAAMAJAAJAAACNJSPo8HtOoCcFFkBnQ6QenAly9Z03xQeGcmYJ5hiI+uesTywrfJK90rj9X4zUu1DzOmOngIAIfkEBQoAAwAsKgADACQACQAAAjSUj6PB7TqAnBRZAZ0OkHpwJcvWdN8UHhnJmCeYYiPrnrE8sK3ySvdK4/V+M1LtQ8zpjp4CACH5BAEKAAMALDcAAwAkAAkAAAI0lI+jwe06gJwUWQGdDpB6cCXL1nTfFB4ZyZgnmGIj656xPLCt8kr3SuP1fjNS7UPM6Y6eAgA7',
            imageFileType: ['image/png', 'image/jpg', 'image/jpeg', 'image/bmp']
        },

    init = function(data, callback){
        if(!data.container) return 'Incorrect data or something is wrong';

        settings.width = data.width || settings.width;
        settings.height = data.height || settings.height;

        Create.appBox(data.container);
        Create.btnsBox();
        Create.videoBox();
        Create.canvasBox();
        Create.resultBox();
        Create.progressBar();

        WebCam.init();
        Loader.start();

        if(callback && typeof(callback) === "function") {
            callbackData = function() {
                callback(resultData);
            }
        }
    },

    Set = {

        appBox: function(appB) {
            appBox = appB;
        },

        videoBox: function(video) {
            videoBox = video;
        },

        canvasBox: function(canvas) {
            canvasBox = canvas;
        },

        resultBox: function(result) {
            resultBox = result;
        },

        btnsBox: function(btns) {
            btnsBox = btns;
        },

        btnCam: function(btn) {
            btnCam = btn;
        },

        btnImg: function(btn) {
            btnImg = btn;
        },

        inputFile: function(inputF) {
            inputFile = inputF;
        },

        labelFile: function(labelF) {
            labelFile = labelF;
        },

        imgProgressBar: function(img) {
            imgProgressBar = img;
        }
    },

    Get = {

        appBox: function() {
            return appBox;
        },

        videoBox: function() {
            return videoBox;
        },

        canvasBox: function() {
            return canvasBox;
        },

        resultBox: function() {
            return resultBox;
        },

        btnsBox: function() {
            return btnsBox;
        },

        btnCam: function() {
            return btnCam;
        },

        btnImg: function() {
            return btnImg;
        },

        inputFile: function() {
            return inputFile;
        },

        labelFile: function() {
            return labelFile;
        },

        imgProgressBar: function() {
            return imgProgressBar;
        }

    },

    Create = {

        element: function(element, callback) {
            var wrapper = document.createElement(element);
            wrapper.width = settings.width;
            wrapper.height = settings.height;

            wrapper.show = function() {
                this.style.display = 'block';
            };
            wrapper.hide = function() {
                this.style.display = 'none';
            };
            wrapper.setOpacity = function(opacity) {
                this.style.opacity = opacity;
            };

            if(callback !== undefined) callback(wrapper);
        },

        appBox: function (container){
            Create.element('div', function(appB){
                Set.appBox(appB);
                Get.appBox().id = settings.id.appBox;

                document.querySelector(container).appendChild(Get.appBox());
            });
        },

        videoBox: function () {
            Create.element('video', function(video){
                Set.videoBox(video);
                Get.videoBox().className = settings.elClass.videoBox;
                Get.videoBox().autoplay = 'autoplay';

                appBox.appendChild(video);
            });
        },

        canvasBox: function () {
            Create.element('canvas', function(canvas){
                Set.canvasBox(canvas);
                Get.canvasBox().className = settings.elClass.canvasBox;
                Canvas.setSize();

                appBox.appendChild(canvas);
            });
        },

        btnsBox: function () {
            Create.element('div', function(btns){
                Set.btnsBox(btns);
                Get.btnsBox().className = settings.elClass.btnsBox;

                appBox.appendChild(btns);

                Create.btnCam();
                Create.btnImg();
                Create.inputFile();
                Create.labelFile();
            });
        },

        btnCam: function () {
            Create.element('div', function(btnCam){
                Set.btnCam(btnCam);
                Get.btnCam().className = settings.elClass.btnCam;
                Get.btnCam().title = 'Scan from WebCam';
                Get.btnCam().style.backgroundImage = "url(" + settings.btnCamBG + ")";
                Get.btnCam().onclick = function() {

                    Get.videoBox().show();
                    Get.labelFile().hide();
                    Get.canvasBox().hide();

                    Get.btnImg().setOpacity(.5);
                    Get.btnCam().setOpacity(.8);

                    Canvas.setSize();

                    if(WebCam.state) {
                        Result.clearBox();
                        Loader.start();
                        Decode.state = true;
                        Decode.start(Get.videoBox());
                    }

                    WebCam.state = true;
                };

                btnsBox.appendChild(btnCam);
            });
        },

        btnImg: function () {
            Create.element('div', function(btnImg){
                Set.btnImg(btnImg);
                Get.btnImg().className = settings.elClass.btnImg;
                Get.btnImg().title = 'Scan from uploading image';
                Get.btnImg().style.backgroundImage = "url(" + settings.btnImgBG + ")";
                Get.btnImg().onclick = function() {
                    Decode.stop();
                    Get.videoBox().hide();

                    Get.btnImg().setOpacity(.8);
                    Get.btnCam().setOpacity(.5);

                    Get.canvasBox().show();
                    Get.labelFile().show();

                    Get.canvasBox().width = settings.width;
                    Get.canvasBox().height = settings.height;

                    Result.clearBox();

                    WebCam.state = false;
                };

                btnsBox.appendChild(btnImg);
            });
        },

        inputFile: function () {
            Create.element('input', function(inputF){
                Set.inputFile(inputF);
                Get.inputFile().id = settings.id.inputFile;
                Get.inputFile().type = 'file';
                Get.inputFile().width = '';
                Get.inputFile().height = '';
                Get.inputFile().onchange = function() {
                  File.accept(this.files[0])
                };

                btnsBox.appendChild(inputF);
            });
        },

        labelFile: function () {
            Create.element('label', function(labelF){
                Set.labelFile(labelF);
                Get.labelFile().htmlFor = Get.inputFile().id;
                Get.labelFile().innerHTML = 'Upload';
                Get.labelFile().className = 'btn btn-info'

                btnsBox.appendChild(labelF);
            });
        },

        resultBox: function () {
            Create.element('div', function(result){
                Set.resultBox(result);
                Get.resultBox().className = settings.elClass.resultBox;
                Get.resultBox().style.width = settings.width;

                appBox.appendChild(result);
            });
        },

        progressBar: function () {
            Create.element('img', function(imgProgressBar){
                Set.imgProgressBar(imgProgressBar);
                Get.imgProgressBar().removeAttribute = 'width';
                Get.imgProgressBar().removeAttribute = 'height';
                Get.imgProgressBar().style.width = 'auto';
                Get.imgProgressBar().style.height = 'auto';
                Get.imgProgressBar().src = settings.imgProgressBarSRC;
                Get.imgProgressBar().alt = '- scanning -';
            });
        }

    },

    WebCam = {

        state: false,

        init: function () {
            navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
            window.URL.createObjectURL = window.URL.createObjectURL || window.URL.webkitCreateObjectURL || window.URL.mozCreateObjectURL || window.URL.msCreateObjectURL;

            navigator.getUserMedia({video: true},
                function (stream) {

                    Get.videoBox().src = window.URL.createObjectURL(stream);
                    Canvas.captureImage(Get.videoBox());

                    WebCam.state = true;

                }, function () {
                    console.log('With the video stream that something is wrong or the user banned :P');
                });
        }

    },

    Canvas = {

        captureImage: function (objectSource) {
            setTimeout(function() {
                Canvas.drawImage(objectSource);
                Canvas.decode(objectSource);
            }, 500);
        },

        drawImage: function(objectSource) {
            Get.canvasBox().getContext("2d").drawImage(objectSource, 0, 0, settings.width, settings.height);
        },

        decode: function(objectSource) {
            Decode.image(Get.canvasBox().toDataURL('image/jpg'), objectSource);
        },

        clear: function() {
            Get.canvasBox().getContext("2d").clearRect(0, 0, settings.width, settings.width);
        },

        setSize: function() {
            Get.canvasBox().width = '640';
            Get.canvasBox().height = '480';
        }

    },

    Decode = {

        state: true,

        start: function(object) {
            QRWebScannerEngine.qrcode.currentStatus = undefined;
            Canvas.captureImage(object);
        },

        stop: function() {
            Decode.state = false;

            setTimeout(Canvas.clear, 500);
            Result.clear();
        },

        image: function(data64Image, objectSource) {
            QRWebScannerEngine.qrcode.decode(data64Image);
            Decode.check(objectSource)
        },

        check: function(objectSource) {
            if(!Decode.state) return;

            if (QRWebScannerEngine.qrcode.currentStatus && QRWebScannerEngine.qrcode.result) {
                resultData = QRWebScannerEngine.qrcode.result;
                Result.insert(QRWebScannerEngine.qrcode.result);
            } else {
                Canvas.captureImage(objectSource);
            }
        }

    },

    File = {

        accept: function(file) {
            Decode.state = true;
            Canvas.clear();
            Result.clearBox();

            var allowedFileTypes = settings.imageFileType.join(', ');

            if (allowedFileTypes.indexOf(file.type) + 1) {

                Loader.start();
                var img = new Image,
                    reader = new FileReader();

                reader.onload = function() {
                    img.src = reader.result;
                    Canvas.captureImage(img);
                };

                reader.readAsDataURL(file);

            } else {
                Result.insert('File must be png, jpg or bmp type');
            }
        }

    },

    Loader = {

        start: function() {
            Get.resultBox().appendChild(Get.imgProgressBar());
        }

    },

    Result = {

        insert: function (data) {
            Result.clearBox();

            if (typeof data == 'string') Get.resultBox().innerHTML = Result.checkForLink(data);

            callbackData();
            Result.clear();
        },

        checkForLink: function (data) {
            if (data.indexOf("http://") === 0 || data.indexOf("https://") === 0) {
                return '<strong><a target="_blank" href="' + data + '">' + data + '</a></strong>';
            }

            return data;
        },

        clearBox: function() {
            Get.resultBox().innerHTML = '';
        },

        clear: function() {
            setTimeout(function(){
                QRWebScannerEngine.qrcode.result = '';
            }, 500);
        }
    };

    return {
        init: init
    }

}());


/**
 * Added to function closures and refactoring by Sergey Illarionov 2015
 * easthunch@gmail, www.maplemap.net
 */

/**
 * Ported to JavaScript by Lazar Laszlo 2011
 * lazarsoft@gmail.com, www.lazarsoft.info
 */

/**
 * Copyright 2007 ZXing authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var QRWebScannerEngine = (function () {

    var MIN_SKIP = 3,
        MAX_MODULES = 57,
        INTEGER_MATH_SHIFT = 8,
        CENTER_QUORUM = 2,


        GridSampler = {

            checkAndNudgePoints: function( image,  points ) {
                var width = qrcode.width,
                    height = qrcode.height,

                // Check and nudge points from start until we see some that are OK:
                    nudged = true, offset;

                for (offset = 0; offset < points.length && nudged; offset += 2) {
                    handler(offset);
                }

                // Check and nudge points from end:
                nudged = true;
                for (offset = points.length - 2; offset >= 0 && nudged; offset -= 2) {
                    handler(offset);
                }

                function handler (offset) {
                    var x = Math.floor (points[offset]);
                    var y = Math.floor( points[offset + 1]);
                    if (x < - 1 || x > width || y < - 1 || y > height) {
                        throw "Error.checkAndNudgePoints ";
                    }
                    nudged = false;
                    if (x == - 1) {
                        points[offset] = 0.0;
                        nudged = true;
                    }
                    else if (x == width) {
                        points[offset] = width - 1;
                        nudged = true;
                    }
                    if (y == - 1) {
                        points[offset + 1] = 0.0;
                        nudged = true;
                    }
                    else if (y == height) {
                        points[offset + 1] = height - 1;
                        nudged = true;
                    }
                }
            },

            sampleGrid3: function ( image,  dimension,  transform ) {
                var bits = new BitMatrix(dimension),
                    points = new Array(dimension << 1);

                for (var y = 0; y < dimension; y++) {
                    var max = points.length,
                        iValue =  y + 0.5;
                    for (var x = 0; x < max; x += 2) {
                        points[x] =  (x >> 1) + 0.5;
                        points[x + 1] = iValue;
                    }
                    transform.transformPoints1(points);
                    // Quick check to see if points transformed to something inside the image;
                    // sufficient to check the endpoints
                    GridSampler.checkAndNudgePoints(image, points);

                    try {
                        for (var k = 0; k < max; k += 2) {
                            var xpoint = (Math.floor( points[k]) * 4) + (Math.floor( points[k + 1]) * qrcode.width * 4),
                                bit = image[Math.floor( points[k])+ qrcode.width* Math.floor( points[k + 1])];

                            qrcode.imagedata.data[xpoint] = bit?255:0;
                            qrcode.imagedata.data[xpoint+1] = bit?255:0;
                            qrcode.imagedata.data[xpoint+2] = 0;
                            qrcode.imagedata.data[xpoint+3] = 255;
                            //bits[k >> 1][ y]=bit;

                            if(bit) bits.set_Renamed(k >> 1, y);
                        }
                    }
                    catch ( aioobe) {
                        // This feels wrong, but, sometimes if the finder patterns are misidentified, the resulting
                        // transform gets "twisted" such that it maps a straight line of points to a set of points
                        // whose endpoints are in bounds, but others are not. There is probably some mathematical
                        // way to detect this about the transformation that I don't know yet.
                        // This results in an ugly runtime exception despite our clever checks above -- can't have
                        // that. We could check each point's coordinates but that feels duplicative. We settle for
                        // catching and wrapping ArrayIndexOutOfBoundsException.
                        throw "Error.checkAndNudgePoints";
                    }
                }
                return bits;
            },

            sampleGridx: function( image,  dimension,  p1ToX,  p1ToY,  p2ToX,  p2ToY,  p3ToX,  p3ToY,  p4ToX,  p4ToY,  p1FromX,  p1FromY,  p2FromX,  p2FromY,  p3FromX,  p3FromY,  p4FromX,  p4FromY) {
                var transform = PerspectiveTransform.quadrilateralToQuadrilateral(p1ToX, p1ToY, p2ToX, p2ToY, p3ToX, p3ToY, p4ToX, p4ToY, p1FromX, p1FromY, p2FromX, p2FromY, p3FromX, p3FromY, p4FromX, p4FromY);

                return GridSampler.sampleGrid3(image, dimension, transform);
            }

        },
    //

        ECB = function (count,  dataCodewords) {
            this.count = count;
            this.dataCodewords = dataCodewords;

            this.__defineGetter__("Count", function() {
                return this.count;
            });
            this.__defineGetter__("DataCodewords", function() {
                return this.dataCodewords;
            });
        },

        ECBlocks = function ( ecCodewordsPerBlock,  ecBlocks1,  ecBlocks2) {
            this.ecCodewordsPerBlock = ecCodewordsPerBlock;
            this.ecBlocks = (ecBlocks2) ? [ecBlocks1, ecBlocks2] : [ecBlocks1];

            this.__defineGetter__("ECCodewordsPerBlock", function() {
                return this.ecCodewordsPerBlock;
            });

            this.__defineGetter__("TotalECCodewords", function() {
                return  this.ecCodewordsPerBlock * this.NumBlocks;
            });

            this.__defineGetter__("NumBlocks", function() {
                var total = 0;
                for (var i = 0; i < this.ecBlocks.length; i++) {
                    total += this.ecBlocks[i].length;
                }
                return total;
            });

            this.getECBlocks=function() {
                return this.ecBlocks;
            }
        },

        Version = function ( versionNumber,  alignmentPatternCenters,  ecBlocks1,  ecBlocks2,  ecBlocks3,  ecBlocks4) {
            this.versionNumber = versionNumber;
            this.alignmentPatternCenters = alignmentPatternCenters;
            this.ecBlocks = [ecBlocks1, ecBlocks2, ecBlocks3, ecBlocks4];

            var total = 0,
                ecCodewords = ecBlocks1.ECCodewordsPerBlock,
                ecbArray = ecBlocks1.getECBlocks();

            for (var i = 0; i < ecbArray.length; i++) {
                var ecBlock = ecbArray[i];
                total += ecBlock.Count * (ecBlock.DataCodewords + ecCodewords);
            }
            this.totalCodewords = total;

            this.__defineGetter__("VersionNumber", function() {
                return  this.versionNumber;
            });

            this.__defineGetter__("AlignmentPatternCenters", function() {
                return  this.alignmentPatternCenters;
            });
            this.__defineGetter__("TotalCodewords", function() {
                return  this.totalCodewords;
            });
            this.__defineGetter__("DimensionForVersion", function() {
                return  17 + 4 * this.versionNumber;
            });

            this.buildFunctionPattern=function() {
                var dimension = this.DimensionForVersion,
                    bitMatrix = new BitMatrix(dimension);

                // Top left finder pattern + separator + format
                bitMatrix.setRegion(0, 0, 9, 9);
                // Top right finder pattern + separator + format
                bitMatrix.setRegion(dimension - 8, 0, 8, 9);
                // Bottom left finder pattern + separator + format
                bitMatrix.setRegion(0, dimension - 8, 9, 8);

                // Alignment patterns
                var max = this.alignmentPatternCenters.length;
                for (var x = 0; x < max; x++) {
                    var i = this.alignmentPatternCenters[x] - 2;
                    for (var y = 0; y < max; y++) {
                        if ((x == 0 && (y == 0 || y == max - 1)) || (x == max - 1 && y == 0)) {
                            // No alignment patterns near the three finder paterns
                            continue;
                        }
                        bitMatrix.setRegion(this.alignmentPatternCenters[y] - 2, i, 5, 5);
                    }
                }

                // Vertical timing pattern
                bitMatrix.setRegion(6, 9, 1, dimension - 17);
                // Horizontal timing pattern
                bitMatrix.setRegion(9, 6, dimension - 17, 1);

                if (this.versionNumber > 6) {
                    // Version info, top right
                    bitMatrix.setRegion(dimension - 11, 0, 3, 6);
                    // Version info, bottom left
                    bitMatrix.setRegion(0, dimension - 11, 6, 3);
                }

                return bitMatrix;
            };

            this.getECBlocksForLevel=function( ecLevel)
            {
                return this.ecBlocks[ecLevel.ordinal()];
            }
        };

    Version.VERSION_DECODE_INFO = [0x07C94, 0x085BC, 0x09A99, 0x0A4D3, 0x0BBF6, 0x0C762, 0x0D847, 0x0E60D, 0x0F928, 0x10B78, 0x1145D, 0x12A17, 0x13532, 0x149A6, 0x15683, 0x168C9, 0x177EC, 0x18EC4, 0x191E1, 0x1AFAB, 0x1B08E, 0x1CC1A, 0x1D33F, 0x1ED75, 0x1F250, 0x209D5, 0x216F0, 0x228BA, 0x2379F, 0x24B0B, 0x2542E, 0x26A64, 0x27541, 0x28C69];

    Version.VERSIONS = buildVersions();

    Version.getVersionForNumber = function( versionNumber) {
        if (versionNumber < 1 || versionNumber > 40) {
            throw "ArgumentException";
        }
        return Version.VERSIONS[versionNumber - 1];
    };

    Version.getProvisionalVersionForDimension = function(dimension) {
        if (dimension % 4 != 1) {
            throw "Error getProvisionalVersionForDimension";
        }
        try {
            return Version.getVersionForNumber((dimension - 17) >> 2);
        }
        catch ( iae) {
            throw "Error getVersionForNumber";
        }
    };

    Version.decodeVersionInformation=function( versionBits) {
        var bestDifference = 0xffffffff,
            bestVersion = 0;
        for (var i = 0; i < Version.VERSION_DECODE_INFO.length; i++) {
            var targetVersion = Version.VERSION_DECODE_INFO[i];
            // Do the version info bits match exactly? done.
            if (targetVersion == versionBits) {
                return this.getVersionForNumber(i + 7);
            }
            // Otherwise see if this is the closest to a real version info bit string
            // we have seen so far
            var bitsDifference = FormatInformation.numBitsDiffering(versionBits, targetVersion);
            if (bitsDifference < bestDifference) {
                bestVersion = i + 7;
                bestDifference = bitsDifference;
            }
        }
        // We can tolerate up to 3 bits of error since no two version info codewords will
        // differ in less than 4 bits.
        if (bestDifference <= 3) {
            return this.getVersionForNumber(bestVersion);
        }
        // If we didn't find a close enough match, fail
        return null;
    };

    function buildVersions() {
        return [new Version(1, [], new ECBlocks(7, new ECB(1, 19)), new ECBlocks(10, new ECB(1, 16)), new ECBlocks(13, new ECB(1, 13)), new ECBlocks(17, new ECB(1, 9))),
            new Version(2, [6, 18], new ECBlocks(10, new ECB(1, 34)), new ECBlocks(16, new ECB(1, 28)), new ECBlocks(22, new ECB(1, 22)), new ECBlocks(28, new ECB(1, 16))),
            new Version(3, [6, 22], new ECBlocks(15, new ECB(1, 55)), new ECBlocks(26, new ECB(1, 44)), new ECBlocks(18, new ECB(2, 17)), new ECBlocks(22, new ECB(2, 13))),
            new Version(4, [6, 26], new ECBlocks(20, new ECB(1, 80)), new ECBlocks(18, new ECB(2, 32)), new ECBlocks(26, new ECB(2, 24)), new ECBlocks(16, new ECB(4, 9))),
            new Version(5, [6, 30], new ECBlocks(26, new ECB(1, 108)), new ECBlocks(24, new ECB(2, 43)), new ECBlocks(18, new ECB(2, 15), new ECB(2, 16)), new ECBlocks(22, new ECB(2, 11), new ECB(2, 12))),
            new Version(6, [6, 34], new ECBlocks(18, new ECB(2, 68)), new ECBlocks(16, new ECB(4, 27)), new ECBlocks(24, new ECB(4, 19)), new ECBlocks(28, new ECB(4, 15))),
            new Version(7, [6, 22, 38], new ECBlocks(20, new ECB(2, 78)), new ECBlocks(18, new ECB(4, 31)), new ECBlocks(18, new ECB(2, 14), new ECB(4, 15)), new ECBlocks(26, new ECB(4, 13), new ECB(1, 14))),
            new Version(8, [6, 24, 42], new ECBlocks(24, new ECB(2, 97)), new ECBlocks(22, new ECB(2, 38), new ECB(2, 39)), new ECBlocks(22, new ECB(4, 18), new ECB(2, 19)), new ECBlocks(26, new ECB(4, 14), new ECB(2, 15))),
            new Version(9, [6, 26, 46], new ECBlocks(30, new ECB(2, 116)), new ECBlocks(22, new ECB(3, 36), new ECB(2, 37)), new ECBlocks(20, new ECB(4, 16), new ECB(4, 17)), new ECBlocks(24, new ECB(4, 12), new ECB(4, 13))),
            new Version(10, [6, 28, 50], new ECBlocks(18, new ECB(2, 68), new ECB(2, 69)), new ECBlocks(26, new ECB(4, 43), new ECB(1, 44)), new ECBlocks(24, new ECB(6, 19), new ECB(2, 20)), new ECBlocks(28, new ECB(6, 15), new ECB(2, 16))),
            new Version(11, [6, 30, 54], new ECBlocks(20, new ECB(4, 81)), new ECBlocks(30, new ECB(1, 50), new ECB(4, 51)), new ECBlocks(28, new ECB(4, 22), new ECB(4, 23)), new ECBlocks(24, new ECB(3, 12), new ECB(8, 13))),
            new Version(12, [6, 32, 58], new ECBlocks(24, new ECB(2, 92), new ECB(2, 93)), new ECBlocks(22, new ECB(6, 36), new ECB(2, 37)), new ECBlocks(26, new ECB(4, 20), new ECB(6, 21)), new ECBlocks(28, new ECB(7, 14), new ECB(4, 15))),
            new Version(13, [6, 34, 62], new ECBlocks(26, new ECB(4, 107)), new ECBlocks(22, new ECB(8, 37), new ECB(1, 38)), new ECBlocks(24, new ECB(8, 20), new ECB(4, 21)), new ECBlocks(22, new ECB(12, 11), new ECB(4, 12))),
            new Version(14, [6, 26, 46, 66], new ECBlocks(30, new ECB(3, 115), new ECB(1, 116)), new ECBlocks(24, new ECB(4, 40), new ECB(5, 41)), new ECBlocks(20, new ECB(11, 16), new ECB(5, 17)), new ECBlocks(24, new ECB(11, 12), new ECB(5, 13))),
            new Version(15, [6, 26, 48, 70], new ECBlocks(22, new ECB(5, 87), new ECB(1, 88)), new ECBlocks(24, new ECB(5, 41), new ECB(5, 42)), new ECBlocks(30, new ECB(5, 24), new ECB(7, 25)), new ECBlocks(24, new ECB(11, 12), new ECB(7, 13))),
            new Version(16, [6, 26, 50, 74], new ECBlocks(24, new ECB(5, 98), new ECB(1, 99)), new ECBlocks(28, new ECB(7, 45), new ECB(3, 46)), new ECBlocks(24, new ECB(15, 19), new ECB(2, 20)), new ECBlocks(30, new ECB(3, 15), new ECB(13, 16))),
            new Version(17, [6, 30, 54, 78], new ECBlocks(28, new ECB(1, 107), new ECB(5, 108)), new ECBlocks(28, new ECB(10, 46), new ECB(1, 47)), new ECBlocks(28, new ECB(1, 22), new ECB(15, 23)), new ECBlocks(28, new ECB(2, 14), new ECB(17, 15))),
            new Version(18, [6, 30, 56, 82], new ECBlocks(30, new ECB(5, 120), new ECB(1, 121)), new ECBlocks(26, new ECB(9, 43), new ECB(4, 44)), new ECBlocks(28, new ECB(17, 22), new ECB(1, 23)), new ECBlocks(28, new ECB(2, 14), new ECB(19, 15))),
            new Version(19, [6, 30, 58, 86], new ECBlocks(28, new ECB(3, 113), new ECB(4, 114)), new ECBlocks(26, new ECB(3, 44), new ECB(11, 45)), new ECBlocks(26, new ECB(17, 21), new ECB(4, 22)), new ECBlocks(26, new ECB(9, 13), new ECB(16, 14))),
            new Version(20, [6, 34, 62, 90], new ECBlocks(28, new ECB(3, 107), new ECB(5, 108)), new ECBlocks(26, new ECB(3, 41), new ECB(13, 42)), new ECBlocks(30, new ECB(15, 24), new ECB(5, 25)), new ECBlocks(28, new ECB(15, 15), new ECB(10, 16))),
            new Version(21, [6, 28, 50, 72, 94], new ECBlocks(28, new ECB(4, 116), new ECB(4, 117)), new ECBlocks(26, new ECB(17, 42)), new ECBlocks(28, new ECB(17, 22), new ECB(6, 23)), new ECBlocks(30, new ECB(19, 16), new ECB(6, 17))),
            new Version(22, [6, 26, 50, 74, 98], new ECBlocks(28, new ECB(2, 111), new ECB(7, 112)), new ECBlocks(28, new ECB(17, 46)), new ECBlocks(30, new ECB(7, 24), new ECB(16, 25)), new ECBlocks(24, new ECB(34, 13))),
            new Version(23, [6, 30, 54, 74, 102], new ECBlocks(30, new ECB(4, 121), new ECB(5, 122)), new ECBlocks(28, new ECB(4, 47), new ECB(14, 48)), new ECBlocks(30, new ECB(11, 24), new ECB(14, 25)), new ECBlocks(30, new ECB(16, 15), new ECB(14, 16))),
            new Version(24, [6, 28, 54, 80, 106], new ECBlocks(30, new ECB(6, 117), new ECB(4, 118)), new ECBlocks(28, new ECB(6, 45), new ECB(14, 46)), new ECBlocks(30, new ECB(11, 24), new ECB(16, 25)), new ECBlocks(30, new ECB(30, 16), new ECB(2, 17))),
            new Version(25, [6, 32, 58, 84, 110], new ECBlocks(26, new ECB(8, 106), new ECB(4, 107)), new ECBlocks(28, new ECB(8, 47), new ECB(13, 48)), new ECBlocks(30, new ECB(7, 24), new ECB(22, 25)), new ECBlocks(30, new ECB(22, 15), new ECB(13, 16))),
            new Version(26, [6, 30, 58, 86, 114], new ECBlocks(28, new ECB(10, 114), new ECB(2, 115)), new ECBlocks(28, new ECB(19, 46), new ECB(4, 47)), new ECBlocks(28, new ECB(28, 22), new ECB(6, 23)), new ECBlocks(30, new ECB(33, 16), new ECB(4, 17))),
            new Version(27, [6, 34, 62, 90, 118], new ECBlocks(30, new ECB(8, 122), new ECB(4, 123)), new ECBlocks(28, new ECB(22, 45), new ECB(3, 46)), new ECBlocks(30, new ECB(8, 23), new ECB(26, 24)), new ECBlocks(30, new ECB(12, 15), 		new ECB(28, 16))),
            new Version(28, [6, 26, 50, 74, 98, 122], new ECBlocks(30, new ECB(3, 117), new ECB(10, 118)), new ECBlocks(28, new ECB(3, 45), new ECB(23, 46)), new ECBlocks(30, new ECB(4, 24), new ECB(31, 25)), new ECBlocks(30, new ECB(11, 15), new ECB(31, 16))),
            new Version(29, [6, 30, 54, 78, 102, 126], new ECBlocks(30, new ECB(7, 116), new ECB(7, 117)), new ECBlocks(28, new ECB(21, 45), new ECB(7, 46)), new ECBlocks(30, new ECB(1, 23), new ECB(37, 24)), new ECBlocks(30, new ECB(19, 15), new ECB(26, 16))),
            new Version(30, [6, 26, 52, 78, 104, 130], new ECBlocks(30, new ECB(5, 115), new ECB(10, 116)), new ECBlocks(28, new ECB(19, 47), new ECB(10, 48)), new ECBlocks(30, new ECB(15, 24), new ECB(25, 25)), new ECBlocks(30, new ECB(23, 15), new ECB(25, 16))),
            new Version(31, [6, 30, 56, 82, 108, 134], new ECBlocks(30, new ECB(13, 115), new ECB(3, 116)), new ECBlocks(28, new ECB(2, 46), new ECB(29, 47)), new ECBlocks(30, new ECB(42, 24), new ECB(1, 25)), new ECBlocks(30, new ECB(23, 15), new ECB(28, 16))),
            new Version(32, [6, 34, 60, 86, 112, 138], new ECBlocks(30, new ECB(17, 115)), new ECBlocks(28, new ECB(10, 46), new ECB(23, 47)), new ECBlocks(30, new ECB(10, 24), new ECB(35, 25)), new ECBlocks(30, new ECB(19, 15), new ECB(35, 16))),
            new Version(33, [6, 30, 58, 86, 114, 142], new ECBlocks(30, new ECB(17, 115), new ECB(1, 116)), new ECBlocks(28, new ECB(14, 46), new ECB(21, 47)), new ECBlocks(30, new ECB(29, 24), new ECB(19, 25)), new ECBlocks(30, new ECB(11, 15), new ECB(46, 16))),
            new Version(34, [6, 34, 62, 90, 118, 146], new ECBlocks(30, new ECB(13, 115), new ECB(6, 116)), new ECBlocks(28, new ECB(14, 46), new ECB(23, 47)), new ECBlocks(30, new ECB(44, 24), new ECB(7, 25)), new ECBlocks(30, new ECB(59, 16), new ECB(1, 17))),
            new Version(35, [6, 30, 54, 78, 102, 126, 150], new ECBlocks(30, new ECB(12, 121), new ECB(7, 122)), new ECBlocks(28, new ECB(12, 47), new ECB(26, 48)), new ECBlocks(30, new ECB(39, 24), new ECB(14, 25)),new ECBlocks(30, new ECB(22, 15), new ECB(41, 16))),
            new Version(36, [6, 24, 50, 76, 102, 128, 154], new ECBlocks(30, new ECB(6, 121), new ECB(14, 122)), new ECBlocks(28, new ECB(6, 47), new ECB(34, 48)), new ECBlocks(30, new ECB(46, 24), new ECB(10, 25)), new ECBlocks(30, new ECB(2, 15), new ECB(64, 16))),
            new Version(37, [6, 28, 54, 80, 106, 132, 158], new ECBlocks(30, new ECB(17, 122), new ECB(4, 123)), new ECBlocks(28, new ECB(29, 46), new ECB(14, 47)), new ECBlocks(30, new ECB(49, 24), new ECB(10, 25)), new ECBlocks(30, new ECB(24, 15), new ECB(46, 16))),
            new Version(38, [6, 32, 58, 84, 110, 136, 162], new ECBlocks(30, new ECB(4, 122), new ECB(18, 123)), new ECBlocks(28, new ECB(13, 46), new ECB(32, 47)), new ECBlocks(30, new ECB(48, 24), new ECB(14, 25)), new ECBlocks(30, new ECB(42, 15), new ECB(32, 16))),
            new Version(39, [6, 26, 54, 82, 110, 138, 166], new ECBlocks(30, new ECB(20, 117), new ECB(4, 118)), new ECBlocks(28, new ECB(40, 47), new ECB(7, 48)), new ECBlocks(30, new ECB(43, 24), new ECB(22, 25)), new ECBlocks(30, new ECB(10, 15), new ECB(67, 16))),
            new Version(40, [6, 30, 58, 86, 114, 142, 170], new ECBlocks(30, new ECB(19, 118), new ECB(6, 119)), new ECBlocks(28, new ECB(18, 47), new ECB(31, 48)), new ECBlocks(30, new ECB(34, 24), new ECB(34, 25)), new ECBlocks(30, new ECB(20, 15), new ECB(61, 16)))];
    }

    //

    var PerspectiveTransform = function ( a11,  a21,  a31,  a12,  a22,  a32,  a13,  a23,  a33) {
        this.a11 = a11;
        this.a12 = a12;
        this.a13 = a13;
        this.a21 = a21;
        this.a22 = a22;
        this.a23 = a23;
        this.a31 = a31;
        this.a32 = a32;
        this.a33 = a33;
        this.transformPoints1=function( points) {
            var max = points.length,
                a11 = this.a11,
                a12 = this.a12,
                a13 = this.a13,
                a21 = this.a21,
                a22 = this.a22,
                a23 = this.a23,
                a31 = this.a31,
                a32 = this.a32,
                a33 = this.a33;
            for (var i = 0; i < max; i += 2) {
                var x = points[i],
                    y = points[i + 1],
                    denominator = a13 * x + a23 * y + a33;
                points[i] = (a11 * x + a21 * y + a31) / denominator;
                points[i + 1] = (a12 * x + a22 * y + a32) / denominator;
            }
        };
        this. transformPoints2=function(xValues, yValues) {
            var n = xValues.length;
            for (var i = 0; i < n; i++) {
                var x = xValues[i],
                    y = yValues[i],
                    denominator = this.a13 * x + this.a23 * y + this.a33;
                xValues[i] = (this.a11 * x + this.a21 * y + this.a31) / denominator;
                yValues[i] = (this.a12 * x + this.a22 * y + this.a32) / denominator;
            }
        };

        this.buildAdjoint=function() {
            // Adjoint is the transpose of the cofactor matrix:
            return new PerspectiveTransform(this.a22 * this.a33 - this.a23 * this.a32, this.a23 * this.a31 - this.a21 * this.a33, this.a21 * this.a32 - this.a22 * this.a31, this.a13 * this.a32 - this.a12 * this.a33, this.a11 * this.a33 - this.a13 * this.a31, this.a12 * this.a31 - this.a11 * this.a32, this.a12 * this.a23 - this.a13 * this.a22, this.a13 * this.a21 - this.a11 * this.a23, this.a11 * this.a22 - this.a12 * this.a21);
        };
        this.times=function( other) {
            return new PerspectiveTransform(this.a11 * other.a11 + this.a21 * other.a12 + this.a31 * other.a13, this.a11 * other.a21 + this.a21 * other.a22 + this.a31 * other.a23, this.a11 * other.a31 + this.a21 * other.a32 + this.a31 * other.a33, this.a12 * other.a11 + this.a22 * other.a12 + this.a32 * other.a13, this.a12 * other.a21 + this.a22 * other.a22 + this.a32 * other.a23, this.a12 * other.a31 + this.a22 * other.a32 + this.a32 * other.a33, this.a13 * other.a11 + this.a23 * other.a12 +this.a33 * other.a13, this.a13 * other.a21 + this.a23 * other.a22 + this.a33 * other.a23, this.a13 * other.a31 + this.a23 * other.a32 + this.a33 * other.a33);
        }

    };

    PerspectiveTransform.quadrilateralToQuadrilateral = function( x0,  y0,  x1,  y1,  x2,  y2,  x3,  y3,  x0p,  y0p,  x1p,  y1p,  x2p,  y2p,  x3p,  y3p) {

        var qToS = this.quadrilateralToSquare(x0, y0, x1, y1, x2, y2, x3, y3),
            sToQ = this.squareToQuadrilateral(x0p, y0p, x1p, y1p, x2p, y2p, x3p, y3p);

        return sToQ.times(qToS);
    };

    PerspectiveTransform.squareToQuadrilateral = function( x0,  y0,  x1,  y1,  x2,  y2,  x3,  y3) {
        var dy2 = y3 - y2,
            dy3 = y0 - y1 + y2 - y3;
        if (dy2 == 0.0 && dy3 == 0.0) {
            return new PerspectiveTransform(x1 - x0, x2 - x1, x0, y1 - y0, y2 - y1, y0, 0.0, 0.0, 1.0);
        }
        else {
            var dx1 = x1 - x2,
                dx2 = x3 - x2,
                dx3 = x0 - x1 + x2 - x3,
                dy1 = y1 - y2,
                denominator = dx1 * dy2 - dx2 * dy1,
                a13 = (dx3 * dy2 - dx2 * dy3) / denominator,
                a23 = (dx1 * dy3 - dx3 * dy1) / denominator;
            return new PerspectiveTransform(x1 - x0 + a13 * x1, x3 - x0 + a23 * x3, x0, y1 - y0 + a13 * y1, y3 - y0 + a23 * y3, y0, a13, a23, 1.0);
        }
    };

    PerspectiveTransform.quadrilateralToSquare=function( x0,  y0,  x1,  y1,  x2,  y2,  x3,  y3) {
        // Here, the adjoint serves as the inverse:
        return this.squareToQuadrilateral(x0, y0, x1, y1, x2, y2, x3, y3).buildAdjoint();
    };

    //

    var DetectorResult = function (bits,  points) {
            this.bits = bits;
            this.points = points;
        },

        Detector = function (image) {
            this.image=image;
            this.resultPointCallback = null;

            this.sizeOfBlackWhiteBlackRun=function( fromX,  fromY,  toX,  toY) {
                // Mild variant of Bresenham's algorithm;
                // see http://en.wikipedia.org/wiki/Bresenham's_line_algorithm
                var steep = Math.abs(toY - fromY) > Math.abs(toX - fromX);
                if (steep) {
                    var temp = fromX;
                    fromX = fromY;
                    fromY = temp;
                    temp = toX;
                    toX = toY;
                    toY = temp;
                }
                var dx = Math.abs(toX - fromX),
                    dy = Math.abs(toY - fromY),
                    error = - dx >> 1,
                    ystep = fromY < toY?1:- 1,
                    xstep = fromX < toX?1:- 1,
                    state = 0; // In black pixels, looking for white, first or second time

                for (var x = fromX, y = fromY; x != toX; x += xstep) {
                    var realX = steep?y:x,
                        realY = steep?x:y;

                    if (state == 1) {
                        // In white pixels, looking for black
                        if (this.image[realX + realY*qrcode.width]) state++;
                    }
                    else {
                        if (!this.image[realX + realY*qrcode.width]) state++;
                    }

                    if (state == 3) {
                        // Found black, white, black, and stumbled back onto white; done
                        var diffX = x - fromX,
                            diffY = y - fromY;
                        return  Math.sqrt( (diffX * diffX + diffY * diffY));
                    }
                    error += dy;
                    if (error > 0) {
                        if (y == toY) break;
                        y += ystep;
                        error -= dx;
                    }
                }
                var diffX2 = toX - fromX,
                    diffY2 = toY - fromY;

                return  Math.sqrt( (diffX2 * diffX2 + diffY2 * diffY2));
            };


            this.sizeOfBlackWhiteBlackRunBothWays=function( fromX,  fromY,  toX,  toY) {

                var result = this.sizeOfBlackWhiteBlackRun(fromX, fromY, toX, toY);

                // Now count other way -- don't run off image though of course
                var scale = 1.0,
                    otherToX = fromX - (toX - fromX);

                if (otherToX < 0) {
                    scale =  fromX /  (fromX - otherToX);
                    otherToX = 0;
                }
                else if (otherToX >= qrcode.width) {
                    scale =  (qrcode.width - 1 - fromX) /  (otherToX - fromX);
                    otherToX = qrcode.width - 1;
                }
                var otherToY = Math.floor (fromY - (toY - fromY) * scale);

                scale = 1.0;
                if (otherToY < 0) {
                    scale =  fromY /  (fromY - otherToY);
                    otherToY = 0;
                }
                else if (otherToY >= qrcode.height) {
                    scale =  (qrcode.height - 1 - fromY) /  (otherToY - fromY);
                    otherToY = qrcode.height - 1;
                }
                otherToX = Math.floor (fromX + (otherToX - fromX) * scale);

                result += this.sizeOfBlackWhiteBlackRun(fromX, fromY, otherToX, otherToY);

                return result - 1.0; // -1 because we counted the middle pixel twice
            };



            this.calculateModuleSizeOneWay=function( pattern,  otherPattern) {
                var moduleSizeEst1 = this.sizeOfBlackWhiteBlackRunBothWays(Math.floor( pattern.X), Math.floor( pattern.Y), Math.floor( otherPattern.X), Math.floor(otherPattern.Y)),
                    moduleSizeEst2 = this.sizeOfBlackWhiteBlackRunBothWays(Math.floor(otherPattern.X), Math.floor(otherPattern.Y), Math.floor( pattern.X), Math.floor(pattern.Y));

                if (isNaN(moduleSizeEst1)) return moduleSizeEst2 / 7.0;
                if (isNaN(moduleSizeEst2)) return moduleSizeEst1 / 7.0;

                // Average them, and divide by 7 since we've counted the width of 3 black modules,
                // and 1 white and 1 black module on either side. Ergo, divide sum by 14.
                return (moduleSizeEst1 + moduleSizeEst2) / 14.0;
            };


            this.calculateModuleSize=function( topLeft,  topRight,  bottomLeft) {
                // Take the average
                return (this.calculateModuleSizeOneWay(topLeft, topRight) + this.calculateModuleSizeOneWay(topLeft, bottomLeft)) / 2.0;
            };

            this.distance=function( pattern1,  pattern2) {
                var xDiff = pattern1.X - pattern2.X,
                    yDiff = pattern1.Y - pattern2.Y;

                return  Math.sqrt( (xDiff * xDiff + yDiff * yDiff));
            };
            this.computeDimension=function( topLeft,  topRight,  bottomLeft,  moduleSize) {

                var tltrCentersDimension = Math.round(this.distance(topLeft, topRight) / moduleSize),
                    tlblCentersDimension = Math.round(this.distance(topLeft, bottomLeft) / moduleSize),
                    dimension = ((tltrCentersDimension + tlblCentersDimension) >> 1) + 7;
                switch (dimension & 0x03) {
                    // mod 4
                    case 0:
                        dimension++;
                        break;
                    // 1? do nothing

                    case 2:
                        dimension--;
                        break;

                    case 3:
                        throw "Error";
                }
                return dimension;
            };

            this.findAlignmentInRegion=function( overallEstModuleSize,  estAlignmentX,  estAlignmentY,  allowanceFactor) {
                // Look for an alignment pattern (3 modules in size) around where it
                // should be
                var allowance = Math.floor (allowanceFactor * overallEstModuleSize),
                    alignmentAreaLeftX = Math.max(0, estAlignmentX - allowance),
                    alignmentAreaRightX = Math.min(qrcode.width - 1, estAlignmentX + allowance);
                if (alignmentAreaRightX - alignmentAreaLeftX < overallEstModuleSize * 3) {
                    throw "Error";
                }

                var alignmentAreaTopY = Math.max(0, estAlignmentY - allowance),
                    alignmentAreaBottomY = Math.min(qrcode.height - 1, estAlignmentY + allowance),

                    alignmentFinder = new AlignmentPatternFinder(this.image, alignmentAreaLeftX, alignmentAreaTopY, alignmentAreaRightX - alignmentAreaLeftX, alignmentAreaBottomY - alignmentAreaTopY, overallEstModuleSize, this.resultPointCallback);

                return alignmentFinder.find();
            };

            this.createTransform=function( topLeft,  topRight,  bottomLeft, alignmentPattern, dimension) {
                var dimMinusThree =  dimension - 3.5,
                    bottomRightX,
                    bottomRightY,
                    sourceBottomRightX,
                    sourceBottomRightY;
                if (alignmentPattern != null) {
                    bottomRightX = alignmentPattern.X;
                    bottomRightY = alignmentPattern.Y;
                    sourceBottomRightX = sourceBottomRightY = dimMinusThree - 3.0;
                }
                else {
                    // Don't have an alignment pattern, just make up the bottom-right point
                    bottomRightX = (topRight.X - topLeft.X) + bottomLeft.X;
                    bottomRightY = (topRight.Y - topLeft.Y) + bottomLeft.Y;
                    sourceBottomRightX = sourceBottomRightY = dimMinusThree;
                }

                return  PerspectiveTransform.quadrilateralToQuadrilateral(3.5, 3.5, dimMinusThree, 3.5, sourceBottomRightX, sourceBottomRightY, 3.5, dimMinusThree, topLeft.X, topLeft.Y, topRight.X, topRight.Y, bottomRightX, bottomRightY, bottomLeft.X, bottomLeft.Y);
            };

            this.sampleGrid=function( image,  transform,  dimension) {

                return GridSampler.sampleGrid3(image, dimension, transform);
            };

            this.processFinderPatternInfo = function( info) {

                var topLeft = info.TopLeft,
                    topRight = info.TopRight,
                    bottomLeft = info.BottomLeft,
                    moduleSize = this.calculateModuleSize(topLeft, topRight, bottomLeft);

                if (moduleSize < 1.0) throw "Error";

                var dimension = this.computeDimension(topLeft, topRight, bottomLeft, moduleSize),
                    provisionalVersion = Version.getProvisionalVersionForDimension(dimension),
                    modulesBetweenFPCenters = provisionalVersion.DimensionForVersion - 7,

                    alignmentPattern = null;
                // Anything above version 1 has an alignment pattern
                if (provisionalVersion.AlignmentPatternCenters.length > 0) {

                    // Guess where a "bottom right" finder pattern would have been
                    var bottomRightX = topRight.X - topLeft.X + bottomLeft.X,
                        bottomRightY = topRight.Y - topLeft.Y + bottomLeft.Y,

                    // Estimate that alignment pattern is closer by 3 modules
                    // from "bottom right" to known top left location
                        correctionToTopLeft = 1.0 - 3.0 /  modulesBetweenFPCenters,
                        estAlignmentX = Math.floor (topLeft.X + correctionToTopLeft * (bottomRightX - topLeft.X)),
                        estAlignmentY = Math.floor (topLeft.Y + correctionToTopLeft * (bottomRightY - topLeft.Y));

                    // Kind of arbitrary -- expand search radius before giving up
                    for (var i = 4; i <= 16; i <<= 1) {
                        //try
                        //{
                        alignmentPattern = this.findAlignmentInRegion(moduleSize, estAlignmentX, estAlignmentY,  i);
                        break;
                        //}
                        //catch (re)
                        //{
                        // try next round
                        //}
                    }
                    // If we didn't find alignment pattern... well try anyway without it
                }

                var transform = this.createTransform(topLeft, topRight, bottomLeft, alignmentPattern, dimension),
                    bits = this.sampleGrid(this.image, transform, dimension),
                    points;
                if (alignmentPattern == null) {
                    points = [bottomLeft, topLeft, topRight];
                }
                else {
                    points = [bottomLeft, topLeft, topRight, alignmentPattern];
                }

                return new DetectorResult(bits, points);
            };

            this.detect=function() {
                var info =  new FinderPatternFinder().findFinderPattern(this.image);

                return this.processFinderPatternInfo(info);
            }
        };

//

    var FORMAT_INFO_MASK_QR = 0x5412,
        FORMAT_INFO_DECODE_LOOKUP = [[0x5412, 0x00], [0x5125, 0x01], [0x5E7C, 0x02], [0x5B4B, 0x03], [0x45F9, 0x04], [0x40CE, 0x05], [0x4F97, 0x06], [0x4AA0, 0x07], [0x77C4, 0x08], [0x72F3, 0x09], [0x7DAA, 0x0A], [0x789D, 0x0B], [0x662F, 0x0C], [0x6318, 0x0D], [0x6C41, 0x0E], [0x6976, 0x0F], [0x1689, 0x10], [0x13BE, 0x11], [0x1CE7, 0x12], [0x19D0, 0x13], [0x0762, 0x14], [0x0255, 0x15], [0x0D0C, 0x16], [0x083B, 0x17], [0x355F, 0x18], [0x3068, 0x19], [0x3F31, 0x1A], [0x3A06, 0x1B], [0x24B4, 0x1C], [0x2183, 0x1D], [0x2EDA, 0x1E], [0x2BED, 0x1F]],
        BITS_SET_IN_HALF_BYTE = [0, 1, 1, 2, 1, 2, 2, 3, 1, 2, 2, 3, 2, 3, 3, 4];


    var FormatInformation = function (formatInfo) {
        this.errorCorrectionLevel = ErrorCorrectionLevel.forBits((formatInfo >> 3) & 0x03);
        this.dataMask =  (formatInfo & 0x07);

        this.__defineGetter__("ErrorCorrectionLevel", function() {
            return this.errorCorrectionLevel;
        });
        this.__defineGetter__("DataMask", function() {
            return this.dataMask;
        });
        this.GetHashCode=function() {
            return (this.errorCorrectionLevel.ordinal() << 3) |  dataMask;
        };
        this.Equals=function( o) {
            var other =  o;
            return this.errorCorrectionLevel == other.errorCorrectionLevel && this.dataMask == other.dataMask;
        }
    };

    FormatInformation.numBitsDiffering = function( a,  b) {
        a ^= b; // a now has a 1 bit exactly where its bit differs with b's
        // Count bits set quickly with a series of lookups:
        return BITS_SET_IN_HALF_BYTE[a & 0x0F] + BITS_SET_IN_HALF_BYTE[(URShift(a, 4) & 0x0F)] + BITS_SET_IN_HALF_BYTE[(URShift(a, 8) & 0x0F)] + BITS_SET_IN_HALF_BYTE[(URShift(a, 12) & 0x0F)] + BITS_SET_IN_HALF_BYTE[(URShift(a, 16) & 0x0F)] + BITS_SET_IN_HALF_BYTE[(URShift(a, 20) & 0x0F)] + BITS_SET_IN_HALF_BYTE[(URShift(a, 24) & 0x0F)] + BITS_SET_IN_HALF_BYTE[(URShift(a, 28) & 0x0F)];
    };

    FormatInformation.decodeFormatInformation = function( maskedFormatInfo) {
        var formatInfo = FormatInformation.doDecodeFormatInformation(maskedFormatInfo);
        if (formatInfo != null) return formatInfo;

        // Should return null, but, some QR codes apparently
        // do not mask this info. Try again by actually masking the pattern
        // first
        return FormatInformation.doDecodeFormatInformation(maskedFormatInfo ^ FORMAT_INFO_MASK_QR);
    };

    FormatInformation.doDecodeFormatInformation=function( maskedFormatInfo) {
        // Find the int in FORMAT_INFO_DECODE_LOOKUP with fewest bits differing
        var bestDifference = 0xffffffff,
            bestFormatInfo = 0;
        for (var i = 0; i < FORMAT_INFO_DECODE_LOOKUP.length; i++) {
            var decodeInfo = FORMAT_INFO_DECODE_LOOKUP[i],
                targetInfo = decodeInfo[0];
            if (targetInfo == maskedFormatInfo) {
                // Found an exact match
                return new FormatInformation(decodeInfo[1]);
            }
            var bitsDifference = this.numBitsDiffering(maskedFormatInfo, targetInfo);
            if (bitsDifference < bestDifference) {
                bestFormatInfo = decodeInfo[1];
                bestDifference = bitsDifference;
            }
        }
        // Hamming distance of the 32 masked codes is 7, by construction, so <= 3 bits
        // differing means we found a match
        if (bestDifference <= 3) return new FormatInformation(bestFormatInfo);

        return null;
    };


    //

    var ErrorCorrectionLevel = function (ordinal,  bits, name) {
        this.ordinal_Renamed_Field = ordinal;
        this.bits = bits;
        this.name = name;
        this.__defineGetter__("Bits", function() {
            return this.bits;
        });
        this.__defineGetter__("Name", function() {
            return this.name;
        });
        this.ordinal=function() {
            return this.ordinal_Renamed_Field;
        }
    };

    ErrorCorrectionLevel.forBits=function( bits) {
        if (bits < 0 || bits >= FOR_BITS.length) {
            throw "ArgumentException";
        }
        return FOR_BITS[bits];
    };

    var L = new ErrorCorrectionLevel(0, 0x01, "L"),
        M = new ErrorCorrectionLevel(1, 0x00, "M"),
        Q = new ErrorCorrectionLevel(2, 0x03, "Q"),
        H = new ErrorCorrectionLevel(3, 0x02, "H"),
        FOR_BITS = [M, L, H, Q];


    //


    var BitMatrix = function ( width,  height) {
        if(!height) height = width;

        if (width < 1 || height < 1) throw "Both dimensions must be greater than 0";
        this.width = width;
        this.height = height;

        var rowSize = width >> 5;
        if ((width & 0x1f) != 0) rowSize++;

        this.rowSize = rowSize;
        this.bits = new Array(rowSize * height);
        for(var i=0;i<this.bits.length;i++)
            this.bits[i]=0;

        this.__defineGetter__("Width", function() {
            return this.width;
        });
        this.__defineGetter__("Height", function() {
            return this.height;
        });
        this.__defineGetter__("Dimension", function() {
            if (this.width != this.height) {
                throw "Can't call getDimension() on a non-square matrix";
            }
            return this.width;
        });

        this.get_Renamed=function( x,  y) {
            var offset = y * this.rowSize + (x >> 5);
            return ((URShift(this.bits[offset], (x & 0x1f))) & 1) != 0;
        };
        this.set_Renamed=function( x,  y) {
            var offset = y * this.rowSize + (x >> 5);
            this.bits[offset] |= 1 << (x & 0x1f);
        };
        this.flip=function( x,  y) {
            var offset = y * this.rowSize + (x >> 5);
            this.bits[offset] ^= 1 << (x & 0x1f);
        };
        this.clear=function() {
            var max = this.bits.length;
            for (var i = 0; i < max; i++) {
                this.bits[i] = 0;
            }
        };
        this.setRegion=function( left,  top,  width,  height) {
            if (top < 0 || left < 0) {
                throw "Left and top must be nonnegative";
            }
            if (height < 1 || width < 1) {
                throw "Height and width must be at least 1";
            }
            var right = left + width;
            var bottom = top + height;
            if (bottom > this.height || right > this.width) {
                throw "The region must fit inside the matrix";
            }
            for (var y = top; y < bottom; y++) {
                var offset = y * this.rowSize;
                for (var x = left; x < right; x++) {
                    this.bits[offset + (x >> 5)] |= 1 << (x & 0x1f);
                }
            }
        }
    };

    //

    var DataBlock = function (numDataCodewords,  codewords) {
        this.numDataCodewords = numDataCodewords;
        this.codewords = codewords;

        this.__defineGetter__("NumDataCodewords", function() {
            return this.numDataCodewords;
        });
        this.__defineGetter__("Codewords", function() {
            return this.codewords;
        })
    };

    DataBlock.getDataBlocks = function (rawCodewords,  version,  ecLevel) {

        if (rawCodewords.length != version.TotalCodewords) throw "ArgumentException";

        // Figure out the number and size of data blocks used by this version and
        // error correction level
        var ecBlocks = version.getECBlocksForLevel(ecLevel),

        // First count the total number of data blocks
            totalBlocks = 0,
            ecBlockArray = ecBlocks.getECBlocks();
        for (var i = 0; i < ecBlockArray.length; i++) {
            totalBlocks += ecBlockArray[i].Count;
        }

        // Now establish DataBlocks of the appropriate size and number of data codewords
        var result = [totalBlocks],
            numResultBlocks = 0;
        for (var j = 0; j < ecBlockArray.length; j++) {
            var ecBlock = ecBlockArray[j];
            for (var k = 0; k < ecBlock.Count; k++) {
                var numDataCodewords = ecBlock.DataCodewords,
                    numBlockCodewords = ecBlocks.ECCodewordsPerBlock + numDataCodewords;
                result[numResultBlocks++] = new DataBlock(numDataCodewords, new Array(numBlockCodewords));
            }
        }

        // All blocks have the same amount of data, except that the last n
        // (where n may be 0) have 1 more byte. Figure out where these start.
        var shorterBlocksTotalCodewords = result[0].codewords.length,
            longerBlocksStartAt = result.length - 1;
        while (longerBlocksStartAt >= 0) {
            var numCodewords = result[longerBlocksStartAt].codewords.length;
            if (numCodewords == shorterBlocksTotalCodewords) {
                break;
            }
            longerBlocksStartAt--;
        }
        longerBlocksStartAt++;

        var shorterBlocksNumDataCodewords = shorterBlocksTotalCodewords - ecBlocks.ECCodewordsPerBlock,
        // The last elements of result may be 1 element longer;
        // first fill out as many elements as all of them have
            rawCodewordsOffset = 0;
        for (var m = 0; m < shorterBlocksNumDataCodewords; m++) {
            for (var l = 0; l < numResultBlocks; l++) {
                result[l].codewords[m] = rawCodewords[rawCodewordsOffset++];
            }
        }
        // Fill out the last data block in the longer ones
        for (var r = longerBlocksStartAt; r < numResultBlocks; r++) {
            result[r].codewords[shorterBlocksNumDataCodewords] = rawCodewords[rawCodewordsOffset++];
        }
        // Now add in error correction blocks
        var max = result[0].codewords.length;
        for (i = shorterBlocksNumDataCodewords; i < max; i++) {
            for (var z = 0; z < numResultBlocks; z++) {
                var iOffset = z < longerBlocksStartAt?i:i + 1;
                result[z].codewords[iOffset] = rawCodewords[rawCodewordsOffset++];
            }
        }
        return result;
    };

    //

    var BitMatrixParser = function (bitMatrix) {
        var dimension = bitMatrix.Dimension;
        if (dimension < 21 || (dimension & 0x03) != 1) {
            throw "Error BitMatrixParser";
        }
        this.bitMatrix = bitMatrix;
        this.parsedVersion = null;
        this.parsedFormatInfo = null;

        this.copyBit = function( i,  j,  versionBits) {
            return this.bitMatrix.get_Renamed(i, j)?(versionBits << 1) | 0x1:versionBits << 1;
        };

        this.readFormatInformation = function() {
            if (this.parsedFormatInfo != null) return this.parsedFormatInfo;

            // Read top-left format info bits
            var formatInfoBits = 0;
            for (var i = 0; i < 6; i++) {
                formatInfoBits = this.copyBit(i, 8, formatInfoBits);
            }
            // .. and skip a bit in the timing pattern ...
            formatInfoBits = this.copyBit(7, 8, formatInfoBits);
            formatInfoBits = this.copyBit(8, 8, formatInfoBits);
            formatInfoBits = this.copyBit(8, 7, formatInfoBits);
            // .. and skip a bit in the timing pattern ...
            for (var j = 5; j >= 0; j--) {
                formatInfoBits = this.copyBit(8, j, formatInfoBits);
            }

            this.parsedFormatInfo = FormatInformation.decodeFormatInformation(formatInfoBits);
            if (this.parsedFormatInfo != null) return this.parsedFormatInfo;

            // Hmm, failed. Try the top-right/bottom-left pattern
            var dimension = this.bitMatrix.Dimension,
                iMin = dimension - 8;
            formatInfoBits = 0;

            for (var k = dimension - 1; k >= iMin; k--) {
                formatInfoBits = this.copyBit(k, 8, formatInfoBits);
            }
            for (var m = dimension - 7; m < dimension; m++) {
                formatInfoBits = this.copyBit(8, m, formatInfoBits);
            }

            this.parsedFormatInfo = FormatInformation.decodeFormatInformation(formatInfoBits);

            if (this.parsedFormatInfo != null) return this.parsedFormatInfo;
            throw "Error readFormatInformation";
        };

        this.readVersion=function() {

            if (this.parsedVersion != null) return this.parsedVersion;

            var dimension = this.bitMatrix.Dimension,
                provisionalVersion = (dimension - 17) >> 2;

            if (provisionalVersion <= 6) return Version.getVersionForNumber(provisionalVersion);

            // Read top-right version info: 3 wide by 6 tall
            var versionBits = 0,
                ijMin = dimension - 11;
            for (var n = 5; n >= 0; n--) {
                for (var l = dimension - 9; l >= ijMin; l--) {
                    versionBits = this.copyBit(l, n, versionBits);
                }
            }

            this.parsedVersion = Version.decodeVersionInformation(versionBits);
            if (this.parsedVersion != null && this.parsedVersion.DimensionForVersion == dimension) {
                return this.parsedVersion;
            }

            // Hmm, failed. Try bottom left: 6 wide by 3 tall
            versionBits = 0;
            for (var i = 5; i >= 0; i--) {
                for (var j = dimension - 9; j >= ijMin; j--) {
                    versionBits = this.copyBit(i, j, versionBits);
                }
            }

            this.parsedVersion = Version.decodeVersionInformation(versionBits);
            if (this.parsedVersion != null && this.parsedVersion.DimensionForVersion == dimension) {
                return this.parsedVersion;
            }
            throw "Error readVersion";
        };
        this.readCodewords=function() {

            var formatInfo = this.readFormatInformation(),
                version = this.readVersion(),

            // Get the data mask for the format used in this QR Code. This will exclude
            // some bits from reading as we wind through the bit matrix.
                dataMask = DataMask.forReference( formatInfo.DataMask),
                dimension = this.bitMatrix.Dimension;
            dataMask.unmaskBitMatrix(this.bitMatrix, dimension);

            var functionPattern = version.buildFunctionPattern();

            var readingUp = true,
                result = new Array(version.TotalCodewords),
                resultOffset = 0,
                currentByte = 0,
                bitsRead = 0;
            // Read columns in pairs, from right to left
            for (var j = dimension - 1; j > 0; j -= 2) {
                if (j == 6) {
                    // Skip whole column with vertical alignment pattern;
                    // saves time and makes the other code proceed more cleanly
                    j--;
                }
                // Read alternatingly from bottom to top then top to bottom
                for (var count = 0; count < dimension; count++) {
                    var i = readingUp?dimension - 1 - count:count;
                    for (var col = 0; col < 2; col++) {
                        // Ignore bits covered by the function pattern
                        if (!functionPattern.get_Renamed(j - col, i)) {
                            // Read a bit
                            bitsRead++;
                            currentByte <<= 1;
                            if (this.bitMatrix.get_Renamed(j - col, i)) {
                                currentByte |= 1;
                            }
                            // If we've made a whole byte, save it off
                            if (bitsRead == 8) {
                                result[resultOffset++] =  currentByte;
                                bitsRead = 0;
                                currentByte = 0;
                            }
                        }
                    }
                }
                readingUp ^= true; // readingUp = !readingUp; // switch directions
            }
            if (resultOffset != version.TotalCodewords) {
                throw "Error readCodewords";
            }
            return result;
        }
    };

    //

    var DataMask = {

            forReference: function(reference) {
                if (reference < 0 || reference > 7) throw "System.ArgumentException";

                return DataMask.DATA_MASKS[reference];
            }

        },

        DataMask000 = function () {
            this.unmaskBitMatrix = function(bits,  dimension) {
                for (var i = 0; i < dimension; i++) {
                    for (var j = 0; j < dimension; j++) {
                        if (this.isMasked(i, j)) {
                            bits.flip(j, i);
                        }
                    }
                }
            };
            this.isMasked = function( i,  j) {
                return ((i + j) & 0x01) == 0;
            }
        },

        DataMask001 = function () {
            this.unmaskBitMatrix = function(bits,  dimension) {
                for (var i = 0; i < dimension; i++) {
                    for (var j = 0; j < dimension; j++) {
                        if (this.isMasked(i, j)) {
                            bits.flip(j, i);
                        }
                    }
                }
            };
            this.isMasked = function( i,  j) {
                return (i & 0x01) == 0;
            }
        },

        DataMask010 = function () {
            this.unmaskBitMatrix = function(bits,  dimension) {
                for (var i = 0; i < dimension; i++) {
                    for (var j = 0; j < dimension; j++) {
                        if (this.isMasked(i, j)) {
                            bits.flip(j, i);
                        }
                    }
                }
            };
            this.isMasked = function( i,  j) {
                return j % 3 == 0;
            }
        },

        DataMask011 = function () {
            this.unmaskBitMatrix = function(bits,  dimension) {
                for (var i = 0; i < dimension; i++) {
                    for (var j = 0; j < dimension; j++) {
                        if (this.isMasked(i, j)) {
                            bits.flip(j, i);
                        }
                    }
                }
            };
            this.isMasked = function( i,  j) {
                return (i + j) % 3 == 0;
            }
        },

        DataMask100 = function () {
            this.unmaskBitMatrix = function (bits,  dimension) {
                for (var i = 0; i < dimension; i++) {
                    for (var j = 0; j < dimension; j++) {
                        if (this.isMasked(i, j)) {
                            bits.flip(j, i);
                        }
                    }
                }
            };
            this.isMasked = function( i,  j) {
                return (((URShift(i, 1)) + (j / 3)) & 0x01) == 0;
            }
        },

        DataMask101 = function () {
            this.unmaskBitMatrix = function(bits,  dimension) {
                for (var i = 0; i < dimension; i++) {
                    for (var j = 0; j < dimension; j++) {
                        if (this.isMasked(i, j)) {
                            bits.flip(j, i);
                        }
                    }
                }
            };
            this.isMasked = function( i,  j) {
                var temp = i * j;
                return (temp & 0x01) + (temp % 3) == 0;
            }
        },

        DataMask110 = function () {
            this.unmaskBitMatrix = function(bits,  dimension) {
                for (var i = 0; i < dimension; i++) {
                    for (var j = 0; j < dimension; j++) {
                        if (this.isMasked(i, j)) {
                            bits.flip(j, i);
                        }
                    }
                }
            };
            this.isMasked = function( i,  j) {
                var temp = i * j;
                return (((temp & 0x01) + (temp % 3)) & 0x01) == 0;
            }
        },

        DataMask111 = function () {
            this.unmaskBitMatrix=function(bits,  dimension) {
                for (var i = 0; i < dimension; i++) {
                    for (var j = 0; j < dimension; j++) {
                        if (this.isMasked(i, j)) {
                            bits.flip(j, i);
                        }
                    }
                }
            };
            this.isMasked=function( i,  j) {
                return ((((i + j) & 0x01) + ((i * j) % 3)) & 0x01) == 0;
            }
        };

    DataMask.DATA_MASKS = [new DataMask000(), new DataMask001(), new DataMask010(), new DataMask011(), new DataMask100(), new DataMask101(), new DataMask110(), new DataMask111()];

    //

    var ReedSolomonDecoder = function (field) {
        this.field = field;
        this.decode = function (received,  twoS) {
            var poly = new GF256Poly(this.field, received),
                syndromeCoefficients = new Array(twoS);

            for (var k=0; k < syndromeCoefficients.length; k++) syndromeCoefficients[k] = 0;
            var dataMatrix = false, //this.field.Equals(GF256.DATA_MATRIX_FIELD)
                noError = true;

            for (var i = 0; i < twoS; i++) {
                // Thanks to sanfordsquires for this fix:
                var eval_ = poly.evaluateAt(this.field.exp(dataMatrix?i + 1:i));
                syndromeCoefficients[syndromeCoefficients.length - 1 - i] = eval_;

                if (eval_ != 0) noError = false;
            }
            if (noError) return ;

            var syndrome = new GF256Poly(this.field, syndromeCoefficients),
                sigmaOmega = this.runEuclideanAlgorithm(this.field.buildMonomial(twoS, 1), syndrome, twoS),
                sigma = sigmaOmega[0],
                omega = sigmaOmega[1],
                errorLocations = this.findErrorLocations(sigma),
                errorMagnitudes = this.findErrorMagnitudes(omega, errorLocations, dataMatrix);

            for (var j = 0; j < errorLocations.length; j++) {
                var position = received.length - 1 - this.field.log(errorLocations[j]);

                if (position < 0) throw "ReedSolomonException Bad error location";
                received[position] = GF256.addOrSubtract(received[position], errorMagnitudes[j]);
            }
        };

        this.runEuclideanAlgorithm=function( a,  b,  R) {
            // Assume a's degree is >= b's
            if (a.Degree < b.Degree) {
                var temp = a;
                a = b;
                b = temp;
            }

            var rLast = a,
                r = b,
                sLast = this.field.One,
                s = this.field.Zero,
                tLast = this.field.Zero,
                t = this.field.One;

            // Run Euclidean algorithm until r's degree is less than R/2
            while (r.Degree >= Math.floor(R / 2)) {
                var rLastLast = rLast,
                    sLastLast = sLast,
                    tLastLast = tLast;
                rLast = r;
                sLast = s;
                tLast = t;

                // Divide rLastLast by rLast, with quotient in q and remainder in r
                if (rLast.Zero) {
                    // Oops, Euclidean algorithm already terminated?
                    throw "r_{i-1} was zero";
                }
                r = rLastLast;
                var q = this.field.Zero,
                    denominatorLeadingTerm = rLast.getCoefficient(rLast.Degree),
                    dltInverse = this.field.inverse(denominatorLeadingTerm);

                while (r.Degree >= rLast.Degree && !r.Zero) {
                    var degreeDiff = r.Degree - rLast.Degree,
                        scale = this.field.multiply(r.getCoefficient(r.Degree), dltInverse);
                    q = q.addOrSubtract(this.field.buildMonomial(degreeDiff, scale));
                    r = r.addOrSubtract(rLast.multiplyByMonomial(degreeDiff, scale));
                    //r.EXE();
                }

                s = q.multiply1(sLast).addOrSubtract(sLastLast);
                t = q.multiply1(tLast).addOrSubtract(tLastLast);
            }

            var sigmaTildeAtZero = t.getCoefficient(0);
            if (sigmaTildeAtZero == 0) throw "ReedSolomonException sigmaTilde(0) was zero";

            var inverse = this.field.inverse(sigmaTildeAtZero),
                sigma = t.multiply2(inverse),
                omega = r.multiply2(inverse);
            return [sigma, omega];
        };
        this.findErrorLocations = function( errorLocator) {
            // This is a direct application of Chien's search
            var numErrors = errorLocator.Degree;
            if (numErrors == 1) {
                // shortcut
                return [errorLocator.getCoefficient(1)];
            }
            var result = [numErrors],
                e = 0;
            for (var i = 1; i < 256 && e < numErrors; i++) {
                if (errorLocator.evaluateAt(i) == 0) {
                    result[e] = this.field.inverse(i);
                    e++;
                }
            }
            if (e != numErrors) throw "Error locator degree does not match number of roots";

            return result;
        };
        this.findErrorMagnitudes = function( errorEvaluator,  errorLocations,  dataMatrix) {
            // This is directly applying Forney's Formula
            var s = errorLocations.length,
                result = [s];
            for (var i = 0; i < s; i++) {
                var xiInverse = this.field.inverse(errorLocations[i]),
                    denominator = 1;
                for (var j = 0; j < s; j++) {
                    if (i != j) denominator = this.field.multiply(denominator, GF256.addOrSubtract(1, this.field.multiply(errorLocations[j], xiInverse)));
                }
                result[i] = this.field.multiply(errorEvaluator.evaluateAt(xiInverse), this.field.inverse(denominator));
                // Thanks to sanfordsquires for this fix:
                if (dataMatrix) result[i] = this.field.multiply(result[i], xiInverse);
            }

            return result;
        }
    };

    //


    var GF256Poly = function (field,  coefficients) {
        if (coefficients == null || coefficients.length == 0) {
            throw "System.ArgumentException";
        }
        this.field = field;
        var coefficientsLength = coefficients.length;
        if (coefficientsLength > 1 && coefficients[0] == 0) {
            // Leading term must be non-zero for anything except the constant polynomial "0"
            var firstNonZero = 1;
            while (firstNonZero < coefficientsLength && coefficients[firstNonZero] == 0) {
                firstNonZero++;
            }
            if (firstNonZero == coefficientsLength) {
                this.coefficients = field.Zero.coefficients;
            } else {
                this.coefficients = new Array(coefficientsLength - firstNonZero);
                for(var i=0;i<this.coefficients.length;i++)this.coefficients[i]=0;
                //Array.Copy(coefficients, firstNonZero, this.coefficients, 0, this.coefficients.length);
                for(var ci=0;ci<this.coefficients.length;ci++)this.coefficients[ci]=coefficients[firstNonZero+ci];
            }
        } else {
            this.coefficients = coefficients;
        }

        this.__defineGetter__("Zero", function() {
            return this.coefficients[0] == 0;
        });
        this.__defineGetter__("Degree", function() {
            return this.coefficients.length - 1;
        });
        this.__defineGetter__("Coefficients", function() {
            return this.coefficients;
        });

        this.getCoefficient=function( degree) {
            return this.coefficients[this.coefficients.length - 1 - degree];
        };

        this.evaluateAt=function( a) {
            if (a == 0) {
                // Just return the x^0 coefficient
                return this.getCoefficient(0);
            }
            var size = this.coefficients.length;
            if (a == 1) {
                // Just the sum of the coefficients
                var result = 0;
                for (var i = 0; i < size; i++) {
                    result = GF256.addOrSubtract(result, this.coefficients[i]);
                }
                return result;
            }
            var result2 = this.coefficients[0];
            for (i = 1; i < size; i++) {
                result2 = GF256.addOrSubtract(this.field.multiply(a, result2), this.coefficients[i]);
            }
            return result2;
        };

        this.addOrSubtract=function( other) {
            if (this.field != other.field) {
                throw "GF256Polys do not have same GF256 field";
            }
            if (this.Zero) return other;
            if (other.Zero) return this;

            var smallerCoefficients = this.coefficients,
                largerCoefficients = other.coefficients;
            if (smallerCoefficients.length > largerCoefficients.length) {
                var temp = smallerCoefficients;
                smallerCoefficients = largerCoefficients;
                largerCoefficients = temp;
            }
            var sumDiff = [largerCoefficients.length],
                lengthDiff = largerCoefficients.length - smallerCoefficients.length;
            // Copy high-order terms only found in higher-degree polynomial's coefficients
            //Array.Copy(largerCoefficients, 0, sumDiff, 0, lengthDiff);
            for (var ci=0; ci<lengthDiff; ci++) sumDiff[ci]=largerCoefficients[ci];

            for (var i = lengthDiff; i < largerCoefficients.length; i++) {
                sumDiff[i] = GF256.addOrSubtract(smallerCoefficients[i - lengthDiff], largerCoefficients[i]);
            }

            return new GF256Poly(field, sumDiff);
        };
        this.multiply1=function( other) {
            if (this.field!=other.field) throw "GF256Polys do not have same GF256 field";

            if (this.Zero || other.Zero) return this.field.Zero;

            var aCoefficients = this.coefficients,
                aLength = aCoefficients.length,
                bCoefficients = other.coefficients,
                bLength = bCoefficients.length,
                product = new Array(aLength + bLength - 1);
            for (var i = 0; i < aLength; i++) {
                var aCoeff = aCoefficients[i];
                for (var j = 0; j < bLength; j++) {
                    product[i + j] = GF256.addOrSubtract(product[i + j], this.field.multiply(aCoeff, bCoefficients[j]));
                }
            }

            return new GF256Poly(this.field, product);
        };

        this.multiply2=function( scalar) {
            if (scalar == 0) return this.field.Zero;
            if (scalar == 1) return this;

            var size = this.coefficients.length,
                product = new Array(size);
            for (var i = 0; i < size; i++) {
                product[i] = this.field.multiply(this.coefficients[i], scalar);
            }

            return new GF256Poly(this.field, product);
        };

        this.multiplyByMonomial=function( degree,  coefficient) {
            if (degree < 0) throw "System.ArgumentException";
            if (coefficient == 0) return this.field.Zero;

            var size = this.coefficients.length,
                product = new Array(size + degree);
            for(var i=0; i<product.length; i++) product[i]=0;
            for (var k = 0; i < size; k++) {
                product[k] = this.field.multiply(this.coefficients[k], coefficient);
            }
            return new GF256Poly(this.field, product);
        };

        this.divide = function( other) {
            if (this.field!=other.field) throw "GF256Polys do not have same GF256 field";
            if (other.Zero) throw "Divide by 0";

            var quotient = this.field.Zero,
                remainder = this,

                denominatorLeadingTerm = other.getCoefficient(other.Degree),
                inverseDenominatorLeadingTerm = this.field.inverse(denominatorLeadingTerm);

            while (remainder.Degree >= other.Degree && !remainder.Zero) {
                var degreeDifference = remainder.Degree - other.Degree,
                    scale = this.field.multiply(remainder.getCoefficient(remainder.Degree), inverseDenominatorLeadingTerm),
                    term = other.multiplyByMonomial(degreeDifference, scale),
                    iterationQuotient = this.field.buildMonomial(degreeDifference, scale);
                quotient = quotient.addOrSubtract(iterationQuotient);
                remainder = remainder.addOrSubtract(term);
            }

            return [quotient, remainder];
        }
    };

    //

    var GF256 = function (primitive) {
        this.expTable = [256];
        this.logTable = [256];
        var x = 1;
        for (var i = 0; i < 256; i++) {
            this.expTable[i] = x;
            x <<= 1; // x = x * 2; we're assuming the generator alpha is 2
            if (x >= 0x100) x ^= primitive;
        }
        for (i = 0; i < 255; i++) {
            this.logTable[this.expTable[i]] = i;
        }
        // logTable[0] == 0 but this should never be used
        var at0 = [1];
        at0[0]=0;
        this.zero = new GF256Poly(this, [at0]);
        var at1 = [1];
        at1[0]=1;
        this.one = new GF256Poly(this, [at1]);

        this.__defineGetter__("Zero", function() {
            return this.zero;
        });
        this.__defineGetter__("One", function() {
            return this.one;
        });
        this.buildMonomial = function( degree,  coefficient) {
            if (degree < 0) throw "System.ArgumentException";
            if (coefficient == 0) return zero;

            var coefficients = [degree + 1];
            for( i=0; i<coefficients.length; i++) coefficients[i] = 0;
            coefficients[0] = coefficient;

            return new GF256Poly(this, coefficients);
        };
        this.exp = function( a) {
            return this.expTable[a];
        };
        this.log=function( a) {
            if (a == 0) throw "System.ArgumentException";

            return this.logTable[a];
        };
        this.inverse = function( a) {
            if (a == 0) throw "System.ArithmeticException";

            return this.expTable[255 - this.logTable[a]];
        };
        this.multiply = function( a,  b) {
            if (a == 0 || b == 0) return 0;
            if (a == 1) return b;
            if (b == 1) return a;

            return this.expTable[(this.logTable[a] + this.logTable[b]) % 255];
        }
    };

    GF256.QR_CODE_FIELD = new GF256(0x011D);
    GF256.DATA_MATRIX_FIELD = new GF256(0x012D);

    GF256.addOrSubtract = function( a,  b) {
        return a ^ b;
    };

    //
    var Decoder = {

        rsDecoder: new ReedSolomonDecoder(GF256.QR_CODE_FIELD),

        correctErrors: function ( codewordBytes, numDataCodewords) {
            var numCodewords = codewordBytes.length,
            // First read into an array of ints
                codewordsInts = [numCodewords];

            for (var i = 0; i < numCodewords; i++) {
                codewordsInts[i] = codewordBytes[i] & 0xFF;
            }

            var numECCodewords = codewordBytes.length - numDataCodewords;

            try {
                Decoder.rsDecoder.decode(codewordsInts, numECCodewords);
                //var corrector = new ReedSolomon(codewordsInts, numECCodewords);
                //corrector.correct();
            }
            catch (rse) {
                throw rse;
            }
            // Copy back into array of bytes -- only need to worry about the bytes that were data
            // We don't care about errors in the error-correction codewords
            for (var k = 0; k < numDataCodewords; k++) {
                codewordBytes[k] = codewordsInts[k];
            }

        },

        decode: function (bits) {
            var parser = new BitMatrixParser(bits),
                version = parser.readVersion(),
                ecLevel = parser.readFormatInformation().ErrorCorrectionLevel,
            // Read codewords
                codewords = parser.readCodewords(),
            // Separate into data blocks
                dataBlocks = DataBlock.getDataBlocks(codewords, version, ecLevel),
            // Count total number of data bytes
                totalBytes = 0;
            for (var i = 0; i < dataBlocks.length; i++) {
                totalBytes += dataBlocks[i].NumDataCodewords;
            }
            var resultBytes = new Array(totalBytes),
                resultOffset = 0;

            // Error-correct and copy data blocks together into a stream of bytes
            for (var j = 0; j < dataBlocks.length; j++) {
                var dataBlock = dataBlocks[j],
                    codewordBytes = dataBlock.Codewords,
                    numDataCodewords = dataBlock.NumDataCodewords;
                Decoder.correctErrors(codewordBytes, numDataCodewords);
                for (var k = 0; k < numDataCodewords; k++) {
                    resultBytes[resultOffset++] = codewordBytes[k];
                }
            }

            // Decode the contents of that stream of bytes
            return new QRCodeDataBlockReader(resultBytes, version.VersionNumber, ecLevel.Bits);
            //return DecodedBitStreamParser.decode(resultBytes, version, ecLevel);
        }
    };


    //

    var qrcode = {

        imagedata: null,
        width: 0,
        height: 0,
        qrCodeSymbol: null,
        debug: false,
        maxImgSize: 1024*1024,
        sizeOfDataLengthInfo:  [ [ 10, 9, 8, 8 ],  [ 12, 11, 16, 10 ],  [ 14, 13, 16, 12 ] ],
        callback: null,

        decode: function(src){

            if(arguments.length==0) {
                var canvas_qr = document.getElementById("qr-canvas"),
                    context = canvas_qr.getContext('2d');

                qrcode.width = canvas_qr.width;
                qrcode.height = canvas_qr.height;
                qrcode.imagedata = context.getImageData(0, 0, qrcode.width, qrcode.height);
                qrcode.result = qrcode.process(context);

                if(qrcode.callback!=null) qrcode.callback(qrcode.result);

                return qrcode.result;
            }
            else {
                var image = new Image();
                image.onload=function () {
                    //var canvas_qr = document.getElementById("qr-canvas");
                    var canvas_qr = document.createElement('canvas'),
                        context = canvas_qr.getContext('2d'),
                        nheight = image.height,
                        nwidth = image.width;
                    if(image.width*image.height>qrcode.maxImgSize) {
                        var ir = image.width / image.height;
                        nheight = Math.sqrt(qrcode.maxImgSize/ir);
                        nwidth=ir*nheight;
                    }

                    canvas_qr.width = nwidth;
                    canvas_qr.height = nheight;

                    context.drawImage(image, 0, 0, canvas_qr.width, canvas_qr.height );
                    qrcode.width = canvas_qr.width;
                    qrcode.height = canvas_qr.height;

                    try{
                        qrcode.imagedata = context.getImageData(0, 0, canvas_qr.width, canvas_qr.height);
                    }
                    catch(e){
                        qrcode.result = "Cross domain image reading not supported in your browser! Save it to your computer then drag and drop the file!";

                        if(qrcode.callback!=null) qrcode.callback(qrcode.result);

                        return;
                    }

                    try {
                        qrcode.result = qrcode.process(context);
                    }
                    catch(e) {
                        console.log(e);
                        qrcode.currentStatus = 0;
                        qrcode.result = "error decoding QR Code";
                    }
                    if(qrcode.callback!=null) qrcode.callback(qrcode.result);
                };

                image.src = src;
            }
        },

        isUrl: function(s) {
            var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;

            return regexp.test(s);
        },

        decode_url: function (s) {
            var escaped = "";
            try {
                escaped = escape( s ); //ToDo: Replace
            }
            catch(e) {
                console.log(e);
                escaped = s;
            }
            var ret = "";
            try {
                ret = decodeURIComponent( escaped );
            }
            catch(e) {
                console.log(e);
                ret = escaped;
            }

            return ret;
        },

        decode_utf8: function ( s ) {
            return (qrcode.isUrl(s)) ? qrcode.decode_url(s) : s;
        },

        process: function(ctx){

            var start = new Date().getTime(),
                image = qrcode.grayScaleToBitmap(qrcode.grayscale());
            //var image = qrcode.binarize(128);

            if(qrcode.debug) {
                for (var y = 0; y < qrcode.height; y++) {
                    for (var x = 0; x < qrcode.width; x++) {
                        var point = (x * 4) + (y * qrcode.width * 4);
                        qrcode.imagedata.data[point] = image[x+y*qrcode.width]?0:0;
                        qrcode.imagedata.data[point+1] = image[x+y*qrcode.width]?0:0;
                        qrcode.imagedata.data[point+2] = image[x+y*qrcode.width]?255:0;
                    }
                }
                ctx.putImageData(qrcode.imagedata, 0, 0);
            }

            //var finderPatternInfo = new FinderPatternFinder().findFinderPattern(image);

            var detector = new Detector(image),
                qRCodeMatrix = detector.detect();

            /*for (var y = 0; y < qRCodeMatrix.bits.Height; y++)
             {
             for (var x = 0; x < qRCodeMatrix.bits.Width; x++)
             {
             var point = (x * 4*2) + (y*2 * qrcode.width * 4);
             qrcode.imagedata.data[point] = qRCodeMatrix.bits.get_Renamed(x,y)?0:0;
             qrcode.imagedata.data[point+1] = qRCodeMatrix.bits.get_Renamed(x,y)?0:0;
             qrcode.imagedata.data[point+2] = qRCodeMatrix.bits.get_Renamed(x,y)?255:0;
             }
             }*/
            if(qrcode.debug) ctx.putImageData(qrcode.imagedata, 0, 0);

            var reader = Decoder.decode(qRCodeMatrix.bits),
                data = reader.DataByte,
                str="";

            for (var i=0;i<data.length;i++) {
                for (var j=0;j<data[i].length;j++)
                    str+=String.fromCharCode(data[i][j]);
            }

            var end = new Date().getTime(),
                time = end - start;

            console.log(time);
            qrcode.currentStatus = time;

            return qrcode.decode_utf8(str);
            //alert("Time:" + time + " Code: "+str);
        },

        getPixel: function(x,y){
            if (qrcode.width < x) throw "point error";
            if (qrcode.height < y) throw "point error";

            var point = (x * 4) + (y * qrcode.width * 4);

            return (qrcode.imagedata.data[point]*33 + qrcode.imagedata.data[point + 1]*34 + qrcode.imagedata.data[point + 2]*33)/100;
        },

        binarize: function (th) {
            var ret = new Array(qrcode.width*qrcode.height);
            for (var y = 0; y < qrcode.height; y++) {
                for (var x = 0; x < qrcode.width; x++) {
                    var gray = qrcode.getPixel(x, y);

                    ret[x+y*qrcode.width] = (gray <= th) ? true : false;
                }
            }

            return ret;
        },

        getMiddleBrightnessPerArea: function(image) {
            var numSqrtArea = 4,
            //obtain middle brightness((min + max) / 2) per area
                areaWidth = Math.floor(qrcode.width / numSqrtArea),
                areaHeight = Math.floor(qrcode.height / numSqrtArea),
                minmax = new Array(numSqrtArea);

            for (var i = 0; i < numSqrtArea; i++) {
                minmax[i] = new Array(numSqrtArea);
                for (var i2 = 0; i2 < numSqrtArea; i2++) {
                    minmax[i][i2] = [0,0];
                }
            }
            for (var ay = 0; ay < numSqrtArea; ay++) {
                for (var ax = 0; ax < numSqrtArea; ax++) {
                    minmax[ax][ay][0] = 0xFF;
                    for (var dy = 0; dy < areaHeight; dy++) {
                        for (var dx = 0; dx < areaWidth; dx++) {
                            var target = image[areaWidth * ax + dx+(areaHeight * ay + dy)*qrcode.width];

                            if (target < minmax[ax][ay][0]) minmax[ax][ay][0] = target;

                            if (target > minmax[ax][ay][1]) minmax[ax][ay][1] = target;
                        }
                    }
                    //minmax[ax][ay][0] = (minmax[ax][ay][0] + minmax[ax][ay][1]) / 2;
                }
            }
            var middle = [numSqrtArea];
            for (var i3 = 0; i3 < numSqrtArea; i3++) {
                middle[i3] = [numSqrtArea];
            }
            for (var ar = 0; ar < numSqrtArea; ar++) {
                for (var az = 0; az < numSqrtArea; az++) {
                    middle[az][ar] = Math.floor((minmax[az][ar][0] + minmax[az][ar][1]) / 2);
                    //Console.out.print(middle[az][ar] + ",");
                }
                //Console.out.println("");
            }
            //Console.out.println("");

            return middle;
        },

        grayScaleToBitmap: function (grayScale) {
            var middle = qrcode.getMiddleBrightnessPerArea(grayScale),
                sqrtNumArea = middle.length,
                areaWidth = Math.floor(qrcode.width / sqrtNumArea),
                areaHeight = Math.floor(qrcode.height / sqrtNumArea),
                bitmap = new Array(qrcode.height*qrcode.width);

            for (var ay = 0; ay < sqrtNumArea; ay++) {
                for (var ax = 0; ax < sqrtNumArea; ax++) {
                    for (var dy = 0; dy < areaHeight; dy++) {
                        for (var dx = 0; dx < areaWidth; dx++) {
                            bitmap[areaWidth * ax + dx+ (areaHeight * ay + dy)*qrcode.width] = (grayScale[areaWidth * ax + dx+ (areaHeight * ay + dy)*qrcode.width] < middle[ax][ay])?true:false;
                        }
                    }
                }
            }

            return bitmap;
        },

        grayscale: function(){
            var ret = [qrcode.width*qrcode.height];
            for (var y = 0; y < qrcode.height; y++) {
                for (var x = 0; x < qrcode.width; x++) {
                    ret[x+y*qrcode.width] = qrcode.getPixel(x, y);
                }
            }

            return ret;
        },

        orderBestPatterns: function(patterns) {

            function distance( pattern1,  pattern2) {
                var xDiff = pattern1.X - pattern2.X,
                    yDiff = pattern1.Y - pattern2.Y;
                return  Math.sqrt( (xDiff * xDiff + yDiff * yDiff));
            }

            /// <summary> Returns the z component of the cross product between vectors BC and BA.</summary>
            function crossProductZ( pointA,  pointB,  pointC) {
                var bX = pointB.x;
                var bY = pointB.y;
                return ((pointC.x - bX) * (pointA.y - bY)) - ((pointC.y - bY) * (pointA.x - bX));
            }


            // Find distances between pattern centers
            var zeroOneDistance = distance(patterns[0], patterns[1]),
                oneTwoDistance = distance(patterns[1], patterns[2]),
                zeroTwoDistance = distance(patterns[0], patterns[2]),
                pointA, pointB, pointC;
            // Assume one closest to other two is B; A and C will just be guesses at first
            if (oneTwoDistance >= zeroOneDistance && oneTwoDistance >= zeroTwoDistance) {
                pointB = patterns[0];
                pointA = patterns[1];
                pointC = patterns[2];
            }
            else if (zeroTwoDistance >= oneTwoDistance && zeroTwoDistance >= zeroOneDistance) {
                pointB = patterns[1];
                pointA = patterns[0];
                pointC = patterns[2];
            }
            else {
                pointB = patterns[2];
                pointA = patterns[0];
                pointC = patterns[1];
            }

            // Use cross product to figure out whether A and C are correct or flipped.
            // This asks whether BC x BA has a positive z component, which is the arrangement
            // we want for A, B, C. If it's negative, then we've got it flipped around and
            // should swap A and C.
            if (crossProductZ(pointA, pointB, pointC) < 0.0) {
                var temp = pointA;
                pointA = pointC;
                pointC = temp;
            }

            patterns[0] = pointA;
            patterns[1] = pointB;
            patterns[2] = pointC;
        }
    };

    function URShift( number,  bits) {
        if (number >= 0)
            return number >> bits;
        else
            return (number >> bits) + (2 << ~bits);
    }

    // Old resolve with global method for Array, replaced by removeArrayArea
    //Array.prototype.remove = function(from, to) {
    //    var rest = this.slice((to || from) + 1 || this.length);
    //    this.length = from < 0 ? this.length + from : from;
    //    return this.push.apply(this, rest);
    //};

    var removeArrayArea = function(array, from, to) {
        var rest = array.slice((to || from) + 1 || array.length);
        array.length = from < 0 ? array.length + from : from;
        return array.push.apply(array, rest);
    };

    //

    var FinderPattern = function (posX, posY,  estimatedModuleSize) {
            this.x=posX;
            this.y=posY;
            this.count = 1;
            this.estimatedModuleSize = estimatedModuleSize;

            this.__defineGetter__("EstimatedModuleSize", function() {
                return this.estimatedModuleSize;
            });
            this.__defineGetter__("Count", function() {
                return this.count;
            });
            this.__defineGetter__("X", function() {
                return this.x;
            });
            this.__defineGetter__("Y", function() {
                return this.y;
            });
            this.incrementCount = function() {
                this.count++;
            };
            this.aboutEquals=function( moduleSize,  i,  j) {
                if (Math.abs(i - this.y) <= moduleSize && Math.abs(j - this.x) <= moduleSize) {
                    var moduleSizeDiff = Math.abs(moduleSize - this.estimatedModuleSize);

                    return moduleSizeDiff <= 1.0 || moduleSizeDiff / this.estimatedModuleSize <= 1.0;
                }

                return false;
            }

        },

        FinderPatternInfo = function (patternCenters) {
            this.bottomLeft = patternCenters[0];
            this.topLeft = patternCenters[1];
            this.topRight = patternCenters[2];
            this.__defineGetter__("BottomLeft", function() {
                return this.bottomLeft;
            });
            this.__defineGetter__("TopLeft", function() {
                return this.topLeft;
            });
            this.__defineGetter__("TopRight", function() {
                return this.topRight;
            });
        },

        FinderPatternFinder = function () {
            this.image=null;
            this.possibleCenters = [];
            this.hasSkipped = false;
            this.crossCheckStateCount = [0,0,0,0,0];
            this.resultPointCallback = null;

            this.__defineGetter__("CrossCheckStateCount", function() {
                this.crossCheckStateCount[0] = 0;
                this.crossCheckStateCount[1] = 0;
                this.crossCheckStateCount[2] = 0;
                this.crossCheckStateCount[3] = 0;
                this.crossCheckStateCount[4] = 0;
                return this.crossCheckStateCount;
            });

            this.foundPatternCross=function( stateCount) {
                var totalModuleSize = 0;
                for (var i = 0; i < 5; i++) {
                    var count = stateCount[i];
                    if (count == 0) {
                        return false;
                    }
                    totalModuleSize += count;
                }
                if (totalModuleSize < 7) {
                    return false;
                }
                var moduleSize = Math.floor((totalModuleSize << INTEGER_MATH_SHIFT) / 7),
                    maxVariance = Math.floor(moduleSize / 2);
                // Allow less than 50% variance from 1-1-3-1-1 proportions
                return Math.abs(moduleSize - (stateCount[0] << INTEGER_MATH_SHIFT)) < maxVariance && Math.abs(moduleSize - (stateCount[1] << INTEGER_MATH_SHIFT)) < maxVariance && Math.abs(3 * moduleSize - (stateCount[2] << INTEGER_MATH_SHIFT)) < 3 * maxVariance && Math.abs(moduleSize - (stateCount[3] << INTEGER_MATH_SHIFT)) < maxVariance && Math.abs(moduleSize - (stateCount[4] << INTEGER_MATH_SHIFT)) < maxVariance;
            };
            this.centerFromEnd=function( stateCount,  end) {
                return  (end - stateCount[4] - stateCount[3]) - stateCount[2] / 2.0;
            };
            this.crossCheckVertical=function( startI,  centerJ,  maxCount,  originalStateCountTotal) {
                var image = this.image,
                    maxI = qrcode.height,
                    stateCount = this.CrossCheckStateCount,

                // Start counting up from center
                    i = startI;
                while (i >= 0 && image[centerJ + i*qrcode.width]) {
                    stateCount[2]++;
                    i--;
                }
                if (i < 0) return NaN;

                while (i >= 0 && !image[centerJ +i*qrcode.width] && stateCount[1] <= maxCount) {
                    stateCount[1]++;
                    i--;
                }
                // If already too many modules in this state or ran off the edge:
                if (i < 0 || stateCount[1] > maxCount) return NaN;

                while (i >= 0 && image[centerJ + i*qrcode.width] && stateCount[0] <= maxCount) {
                    stateCount[0]++;
                    i--;
                }
                if (stateCount[0] > maxCount) return NaN;

                // Now also count down from center
                i = startI + 1;
                while (i < maxI && image[centerJ +i*qrcode.width]) {
                    stateCount[2]++;
                    i++;
                }
                if (i == maxI) return NaN;

                while (i < maxI && !image[centerJ + i*qrcode.width] && stateCount[3] < maxCount) {
                    stateCount[3]++;
                    i++;
                }
                if (i == maxI || stateCount[3] >= maxCount) return NaN;

                while (i < maxI && image[centerJ + i*qrcode.width] && stateCount[4] < maxCount) {
                    stateCount[4]++;
                    i++;
                }
                if (stateCount[4] >= maxCount) return NaN;

                // If we found a finder-pattern-like section, but its size is more than 40% different than
                // the original, assume it's a false positive
                var stateCountTotal = stateCount[0] + stateCount[1] + stateCount[2] + stateCount[3] + stateCount[4];
                if (5 * Math.abs(stateCountTotal - originalStateCountTotal) >= 2 * originalStateCountTotal) {
                    return NaN;
                }

                return this.foundPatternCross(stateCount)?this.centerFromEnd(stateCount, i):NaN;
            };
            this.crossCheckHorizontal=function( startJ,  centerI,  maxCount, originalStateCountTotal) {
                var image = this.image,

                    maxJ = qrcode.width,
                    stateCount = this.CrossCheckStateCount,

                    j = startJ;
                while (j >= 0 && image[j+ centerI*qrcode.width]) {
                    stateCount[2]++;
                    j--;
                }
                if (j < 0) return NaN;

                while (j >= 0 && !image[j+ centerI*qrcode.width] && stateCount[1] <= maxCount) {
                    stateCount[1]++;
                    j--;
                }
                if (j < 0 || stateCount[1] > maxCount) return NaN;

                while (j >= 0 && image[j+ centerI*qrcode.width] && stateCount[0] <= maxCount) {
                    stateCount[0]++;
                    j--;
                }
                if (stateCount[0] > maxCount) return NaN;

                j = startJ + 1;
                while (j < maxJ && image[j+ centerI*qrcode.width]) {
                    stateCount[2]++;
                    j++;
                }
                if (j == maxJ) return NaN;

                while (j < maxJ && !image[j+ centerI*qrcode.width] && stateCount[3] < maxCount) {
                    stateCount[3]++;
                    j++;
                }
                if (j == maxJ || stateCount[3] >= maxCount) return NaN;

                while (j < maxJ && image[j+ centerI*qrcode.width] && stateCount[4] < maxCount) {
                    stateCount[4]++;
                    j++;
                }
                if (stateCount[4] >= maxCount) return NaN;

                // If we found a finder-pattern-like section, but its size is significantly different than
                // the original, assume it's a false positive
                var stateCountTotal = stateCount[0] + stateCount[1] + stateCount[2] + stateCount[3] + stateCount[4];
                if (5 * Math.abs(stateCountTotal - originalStateCountTotal) >= originalStateCountTotal) {
                    return NaN;
                }

                return this.foundPatternCross(stateCount)?this.centerFromEnd(stateCount, j):NaN;
            };

            this.handlePossibleCenter=function( stateCount,  i,  j) {
                var stateCountTotal = stateCount[0] + stateCount[1] + stateCount[2] + stateCount[3] + stateCount[4],
                    centerJ = this.centerFromEnd(stateCount, j), //float
                    centerI = this.crossCheckVertical(i, Math.floor( centerJ), stateCount[2], stateCountTotal); //float
                if (!isNaN(centerI)) {
                    // Re-cross check
                    centerJ = this.crossCheckHorizontal(Math.floor( centerJ), Math.floor( centerI), stateCount[2], stateCountTotal);
                    if (!isNaN(centerJ)) {
                        var estimatedModuleSize =   stateCountTotal / 7.0,
                            found = false,
                            max = this.possibleCenters.length;
                        for (var index = 0; index < max; index++) {
                            var center = this.possibleCenters[index];
                            // Look for about the same center and module size:
                            if (center.aboutEquals(estimatedModuleSize, centerI, centerJ)) {
                                center.incrementCount();
                                found = true;
                                break;
                            }
                        }
                        if (!found) {
                            var point = new FinderPattern(centerJ, centerI, estimatedModuleSize);
                            this.possibleCenters.push(point);
                            if (this.resultPointCallback != null) {
                                this.resultPointCallback.foundPossibleResultPoint(point);
                            }
                        }
                        return true;
                    }
                }
                return false;
            };

            this.selectBestPatterns=function() {
                var startSize = this.possibleCenters.length;
                if (startSize < 3) {
                    // Couldn't find enough finder patterns
                    throw "Couldn't find enough finder patterns";
                }

                // Filter outlier possibilities whose module size is too different
                if (startSize > 3) {
                    // But we can only afford to do so if we have at least 4 possibilities to choose from
                    var totalModuleSize = 0.0,
                        square = 0.0;
                    for (var i = 0; i < startSize; i++) {
                        //totalModuleSize +=  this.possibleCenters[i].EstimatedModuleSize;
                        var	centerValue=this.possibleCenters[i].EstimatedModuleSize;
                        totalModuleSize += centerValue;
                        square += (centerValue * centerValue);
                    }
                    var average = totalModuleSize /  startSize;
                    this.possibleCenters.sort(function(center1,center2) {
                        var dA=Math.abs(center2.EstimatedModuleSize - average),
                            dB=Math.abs(center1.EstimatedModuleSize - average);
                        if (dA < dB) {
                            return (-1);
                        } else if (dA == dB) {
                            return 0;
                        } else {
                            return 1;
                        }
                    });

                    var stdDev = Math.sqrt(square / startSize - average * average),
                        limit = Math.max(0.2 * average, stdDev);
                    for (i = 0; i < this.possibleCenters.length && this.possibleCenters.length > 3; i++) {
                        var pattern =  this.possibleCenters[i];
                        //if (Math.abs(pattern.EstimatedModuleSize - average) > 0.2 * average)
                        console.log(pattern);
                        if (Math.abs(pattern.EstimatedModuleSize - average) > limit) {
                            //this.possibleCenters.remove(i); Old resolve for global method for array, see 1989
                            removeArrayArea(this.possibleCenters, i);
                            i--;
                        }
                    }
                }

                if (this.possibleCenters.length > 3) {
                    // Throw away all but those first size candidate points we found.
                    this.possibleCenters.sort(function(a, b){
                        if (a.count > b.count) return -1;
                        if (a.count < b.count) return 1;
                        return 0;
                    });
                }

                return [this.possibleCenters[0],  this.possibleCenters[1],  this.possibleCenters[2]];
            };

            this.findRowSkip=function() {
                var max = this.possibleCenters.length;
                if (max <= 1) return 0;

                var firstConfirmedCenter = null;
                for (var i = 0; i < max; i++) {
                    var center =  this.possibleCenters[i];
                    if (center.Count >= CENTER_QUORUM) {

                        if (firstConfirmedCenter == null) {
                            firstConfirmedCenter = center;
                        } else {
                            // We have two confirmed centers
                            // How far down can we skip before resuming looking for the next
                            // pattern? In the worst case, only the difference between the
                            // difference in the x / y coordinates of the two centers.
                            // This is the case where you find top left last.
                            this.hasSkipped = true;
                            return Math.floor ((Math.abs(firstConfirmedCenter.X - center.X) - Math.abs(firstConfirmedCenter.Y - center.Y)) / 2);
                        }
                    }
                }
                return 0;
            };

            this.haveMultiplyConfirmedCenters=function() {
                var confirmedCount = 0,
                    totalModuleSize = 0.0,
                    max = this.possibleCenters.length;
                for (var i = 0; i < max; i++) {
                    var pattern =  this.possibleCenters[i];
                    if (pattern.Count >= CENTER_QUORUM) {
                        confirmedCount++;
                        totalModuleSize += pattern.EstimatedModuleSize;
                    }
                }
                if (confirmedCount < 3) return false;
                // OK, we have at least 3 confirmed centers, but, it's possible that one is a "false positive"
                // and that we need to keep looking. We detect this by asking if the estimated module sizes
                // vary too much. We arbitrarily say that when the total deviation from average exceeds
                // 5% of the total module size estimates, it's too much.
                var average = totalModuleSize / max;
                var totalDeviation = 0.0;
                for (i = 0; i < max; i++) {
                    pattern = this.possibleCenters[i];
                    totalDeviation += Math.abs(pattern.EstimatedModuleSize - average);
                }
                return totalDeviation <= 0.05 * totalModuleSize;
            };

            this.findFinderPattern = function(image){
                var tryHarder = false;
                this.image=image;
                var maxI = qrcode.height,
                    maxJ = qrcode.width,
                    iSkip = Math.floor((3 * maxI) / (4 * MAX_MODULES));

                if (iSkip < MIN_SKIP || tryHarder) iSkip = MIN_SKIP;

                var done = false,
                    stateCount = [5];
                for (var i = iSkip - 1; i < maxI && !done; i += iSkip) {
                    // Get a row of black/white values
                    stateCount[0] = 0;
                    stateCount[1] = 0;
                    stateCount[2] = 0;
                    stateCount[3] = 0;
                    stateCount[4] = 0;
                    var currentState = 0;
                    for (var j = 0; j < maxJ; j++) {
                        if (image[j+i*qrcode.width] ) {
                            // Black pixel
                            if ((currentState & 1) == 1) {
                                // Counting white pixels
                                currentState++;
                            }
                            stateCount[currentState]++;
                        } else {
                            // White pixel
                            if ((currentState & 1) == 0) {
                                // Counting black pixels
                                if (currentState == 4) {
                                    // A winner?
                                    if (this.foundPatternCross(stateCount)) {
                                        // Yes
                                        var confirmed = this.handlePossibleCenter(stateCount, i, j);
                                        if (confirmed) {
                                            // Start examining every other line. Checking each line turned out to be too
                                            // expensive and didn't improve performance.
                                            iSkip = 2;
                                            if (this.hasSkipped) {
                                                done = this.haveMultiplyConfirmedCenters();
                                            } else {
                                                var rowSkip = this.findRowSkip();
                                                if (rowSkip > stateCount[2]) {
                                                    // Skip rows between row of lower confirmed center
                                                    // and top of presumed third confirmed center
                                                    // but back up a bit to get a full chance of detecting
                                                    // it, entire width of center of finder pattern

                                                    // Skip by rowSkip, but back off by stateCount[2] (size of last center
                                                    // of pattern we saw) to be conservative, and also back off by iSkip which
                                                    // is about to be re-added
                                                    i += rowSkip - stateCount[2] - iSkip;
                                                    j = maxJ - 1;
                                                }
                                            }
                                        } else {
                                            // Advance to next black pixel
                                            do {
                                                j++;
                                            }
                                            while (j < maxJ && !image[j + i*qrcode.width]);
                                            j--; // back up to that last white pixel
                                        }
                                        // Clear state to start looking again
                                        currentState = 0;
                                        stateCount[0] = 0;
                                        stateCount[1] = 0;
                                        stateCount[2] = 0;
                                        stateCount[3] = 0;
                                        stateCount[4] = 0;
                                    } else {
                                        // No, shift counts back by two
                                        stateCount[0] = stateCount[2];
                                        stateCount[1] = stateCount[3];
                                        stateCount[2] = stateCount[4];
                                        stateCount[3] = 1;
                                        stateCount[4] = 0;
                                        currentState = 3;
                                    }
                                } else {
                                    stateCount[++currentState]++;
                                }
                            } else {
                                // Counting white pixels
                                stateCount[currentState]++;
                            }
                        }
                    }
                    if (this.foundPatternCross(stateCount)) {
                        confirmed = this.handlePossibleCenter(stateCount, i, maxJ);
                        if (confirmed) {
                            iSkip = stateCount[0];
                            if (this.hasSkipped) {
                                // Found a third one
                                done = haveMultiplyConfirmedCenters();
                            }
                        }
                    }
                }

                var patternInfo = this.selectBestPatterns();
                qrcode.orderBestPatterns(patternInfo);

                return new FinderPatternInfo(patternInfo);
            };
        };

    //

    var AlignmentPattern = function (posX, posY,  estimatedModuleSize) {
        this.x=posX;
        this.y=posY;
        this.count = 1;
        this.estimatedModuleSize = estimatedModuleSize;

        this.__defineGetter__("EstimatedModuleSize", function() {
            return this.estimatedModuleSize;
        });
        this.__defineGetter__("Count", function() {
            return this.count;
        });
        this.__defineGetter__("X", function() {
            return Math.floor(this.x);
        });
        this.__defineGetter__("Y", function() {
            return Math.floor(this.y);
        });
        this.incrementCount = function() {
            this.count++;
        };
        this.aboutEquals=function( moduleSize,  i,  j) {
            if (Math.abs(i - this.y) <= moduleSize && Math.abs(j - this.x) <= moduleSize) {
                var moduleSizeDiff = Math.abs(moduleSize - this.estimatedModuleSize);

                return moduleSizeDiff <= 1.0 || moduleSizeDiff / this.estimatedModuleSize <= 1.0;
            }
            return false;
        }

    };

    var AlignmentPatternFinder = function ( image,  startX,  startY,  width,  height,  moduleSize,  resultPointCallback) {
        this.image = image;
        this.possibleCenters = [];
        this.startX = startX;
        this.startY = startY;
        this.width = width;
        this.height = height;
        this.moduleSize = moduleSize;
        this.crossCheckStateCount = [0,0,0];
        this.resultPointCallback = resultPointCallback;

        this.centerFromEnd=function(stateCount,  end) {
            return  (end - stateCount[2]) - stateCount[1] / 2.0;
        };
        this.foundPatternCross = function(stateCount) {
            var moduleSize = this.moduleSize,
                maxVariance = moduleSize / 2.0;
            for (var i = 0; i < 3; i++) {
                if (Math.abs(moduleSize - stateCount[i]) >= maxVariance) return false;
            }

            return true;
        };

        this.crossCheckVertical=function( startI,  centerJ,  maxCount,  originalStateCountTotal) {
            var image = this.image,
                maxI = qrcode.height,
                stateCount = this.crossCheckStateCount;
            stateCount[0] = 0;
            stateCount[1] = 0;
            stateCount[2] = 0;

            // Start counting up from center
            var i = startI;
            while (i >= 0 && image[centerJ + i*qrcode.width] && stateCount[1] <= maxCount) {
                stateCount[1]++;
                i--;
            }
            // If already too many modules in this state or ran off the edge:
            if (i < 0 || stateCount[1] > maxCount) return NaN;

            while (i >= 0 && !image[centerJ + i*qrcode.width] && stateCount[0] <= maxCount) {
                stateCount[0]++;
                i--;
            }
            if (stateCount[0] > maxCount) return NaN;

            // Now also count down from center
            i = startI + 1;
            while (i < maxI && image[centerJ + i*qrcode.width] && stateCount[1] <= maxCount) {
                stateCount[1]++;
                i++;
            }
            if (i == maxI || stateCount[1] > maxCount) return NaN;

            while (i < maxI && !image[centerJ + i*qrcode.width] && stateCount[2] <= maxCount) {
                stateCount[2]++;
                i++;
            }
            if (stateCount[2] > maxCount) return NaN;

            var stateCountTotal = stateCount[0] + stateCount[1] + stateCount[2];
            if (5 * Math.abs(stateCountTotal - originalStateCountTotal) >= 2 * originalStateCountTotal) {
                return NaN;
            }

            return this.foundPatternCross(stateCount)?this.centerFromEnd(stateCount, i):NaN;
        };

        this.handlePossibleCenter=function( stateCount,  i,  j) {
            var stateCountTotal = stateCount[0] + stateCount[1] + stateCount[2],
                centerJ = this.centerFromEnd(stateCount, j),
                centerI = this.crossCheckVertical(i, Math.floor (centerJ), 2 * stateCount[1], stateCountTotal);
            if (!isNaN(centerI)) {
                var estimatedModuleSize = (stateCount[0] + stateCount[1] + stateCount[2]) / 3.0,
                    max = this.possibleCenters.length;
                for (var index = 0; index < max; index++) {
                    var center =  this.possibleCenters[index];
                    // Look for about the same center and module size:
                    if (center.aboutEquals(estimatedModuleSize, centerI, centerJ)) {
                        return new AlignmentPattern(centerJ, centerI, estimatedModuleSize);
                    }
                }
                // Hadn't found this before; save it
                var point = new AlignmentPattern(centerJ, centerI, estimatedModuleSize);
                this.possibleCenters.push(point);
                if (this.resultPointCallback != null) {
                    this.resultPointCallback.foundPossibleResultPoint(point);
                }
            }

            return null;
        };

        this.find = function() {
            var startX = this.startX,
                height = this.height,
                maxJ = startX + width,
                middleI = startY + (height >> 1);
            // We are looking for black/white/black modules in 1:1:1 ratio;
            // this tracks the number of black/white/black modules seen so far
            var stateCount = [0,0,0];

            for (var iGen = 0; iGen < height; iGen++) {
                // Search from middle outwards
                var i = middleI + ((iGen & 0x01) == 0?((iGen + 1) >> 1):- ((iGen + 1) >> 1));
                stateCount[0] = 0;
                stateCount[1] = 0;
                stateCount[2] = 0;
                var j = startX;
                // Burn off leading white pixels before anything else; if we start in the middle of
                // a white run, it doesn't make sense to count its length, since we don't know if the
                // white run continued to the left of the start point
                while (j < maxJ && !image[j + qrcode.width* i]) {
                    j++;
                }
                var currentState = 0;
                while (j < maxJ) {
                    if (image[j + i*qrcode.width]) {
                        // Black pixel
                        if (currentState == 1) {
                            // Counting black pixels
                            stateCount[currentState]++;
                        }
                        else {
                            // Counting white pixels
                            if (currentState == 2) {
                                // A winner?
                                if (this.foundPatternCross(stateCount)) {
                                    // Yes
                                    var confirmed = this.handlePossibleCenter(stateCount, i, j);
                                    if (confirmed != null) {
                                        return confirmed;
                                    }
                                }
                                stateCount[0] = stateCount[2];
                                stateCount[1] = 1;
                                stateCount[2] = 0;
                                currentState = 1;
                            }
                            else {
                                stateCount[++currentState]++;
                            }
                        }
                    }
                    else {
                        // White pixel
                        if (currentState == 1) {
                            // Counting black pixels
                            currentState++;
                        }
                        stateCount[currentState]++;
                    }
                    j++;
                }
                if (this.foundPatternCross(stateCount)) {
                    var confirmed = this.handlePossibleCenter(stateCount, i, maxJ);
                    if (confirmed != null) return confirmed;
                }
            }

            // Hmm, nothing we saw was observed and confirmed twice. If we had
            // any guess at all, return it.
            if (!(this.possibleCenters.length == 0)) {
                return  this.possibleCenters[0];
            }

            throw "Couldn't find enough alignment patterns";
        }
    };

    //

    var QRCodeDataBlockReader = function (blocks,  version,  numErrorCorrectionCode) {
        this.blockPointer = 0;
        this.bitPointer = 7;
        this.dataLength = 0;
        this.blocks = blocks;
        this.numErrorCorrectionCode = numErrorCorrectionCode;
        if (version <= 9)
            this.dataLengthMode = 0;
        else if (version >= 10 && version <= 26)
            this.dataLengthMode = 1;
        else if (version >= 27 && version <= 40)
            this.dataLengthMode = 2;

        this.getNextBits = function( numBits) {
            var bits = 0;
            if (numBits < this.bitPointer + 1) {
                // next word fits into current data block
                var mask = 0;
                for (var i = 0; i < numBits; i++) {
                    mask += (1 << i);
                }
                mask <<= (this.bitPointer - numBits + 1);

                bits = (this.blocks[this.blockPointer] & mask) >> (this.bitPointer - numBits + 1);
                this.bitPointer -= numBits;
                return bits;
            }
            else if (numBits < this.bitPointer + 1 + 8) {
                // next word crosses 2 data blocks
                var mask1 = 0;
                for (i = 0; i < this.bitPointer + 1; i++) {
                    mask1 += (1 << i);
                }
                bits = (this.blocks[this.blockPointer] & mask1) << (numBits - (this.bitPointer + 1));
                this.blockPointer++;
                bits += ((this.blocks[this.blockPointer]) >> (8 - (numBits - (this.bitPointer + 1))));

                this.bitPointer = this.bitPointer - numBits % 8;
                if (this.bitPointer < 0) {
                    this.bitPointer = 8 + this.bitPointer;
                }
                return bits;
            }
            else if (numBits < this.bitPointer + 1 + 16) {
                // next word crosses 3 data blocks
                var mask1 = 0, // mask of first block
                    mask3 = 0; // mask of 3rd block
                //bitPointer + 1 : number of bits of the 1st block
                //8 : number of the 2nd block (note that use already 8bits because next word uses 3 data blocks)
                //numBits - (bitPointer + 1 + 8) : number of bits of the 3rd block
                for (i = 0; i < this.bitPointer + 1; i++) {
                    mask1 += (1 << i);
                }
                var bitsFirstBlock = (this.blocks[this.blockPointer] & mask1) << (numBits - (this.bitPointer + 1));
                this.blockPointer++;

                var bitsSecondBlock = this.blocks[this.blockPointer] << (numBits - (this.bitPointer + 1 + 8));
                this.blockPointer++;

                for (i = 0; i < numBits - (this.bitPointer + 1 + 8); i++) {
                    mask3 += (1 << i);
                }
                mask3 <<= 8 - (numBits - (this.bitPointer + 1 + 8));
                var bitsThirdBlock = (this.blocks[this.blockPointer] & mask3) >> (8 - (numBits - (this.bitPointer + 1 + 8)));

                bits = bitsFirstBlock + bitsSecondBlock + bitsThirdBlock;
                this.bitPointer = this.bitPointer - (numBits - 8) % 8;
                if (this.bitPointer < 0) this.bitPointer = 8 + this.bitPointer;

                return bits;
            }
            else {
                return 0;
            }
        };
        this.NextMode=function() {
            if ((this.blockPointer > this.blocks.length - this.numErrorCorrectionCode - 2))
                return 0;
            else
                return this.getNextBits(4);
        };
        this.getDataLength = function( modeIndicator) {
            var index = 0;
            while (true) {
                if ((modeIndicator >> index) == 1)
                    break;
                index++;
            }

            return this.getNextBits(qrcode.sizeOfDataLengthInfo[this.dataLengthMode][index]);
        };
        this.getRomanAndFigureString=function( dataLength) {
            var length = dataLength,
                intData = 0,
                strData = "",
                tableRomanAndFigure = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', ' ', '$', '%', '*', '+', '-', '.', '/', ':'];
            do {
                if (length > 1) {
                    intData = this.getNextBits(11);
                    var firstLetter = Math.floor(intData / 45),
                        secondLetter = intData % 45;
                    strData += tableRomanAndFigure[firstLetter];
                    strData += tableRomanAndFigure[secondLetter];
                    length -= 2;
                }
                else if (length == 1) {
                    intData = this.getNextBits(6);
                    strData += tableRomanAndFigure[intData];
                    length -= 1;
                }
            }
            while (length > 0);

            return strData;
        };
        this.getFigureString=function( dataLength) {
            var length = dataLength,
                intData = 0,
                strData = "";
            do {
                if (length >= 3) {
                    intData = this.getNextBits(10);
                    if (intData < 100) strData += "0";
                    if (intData < 10)  strData += "0";
                    length -= 3;
                }
                else if (length == 2) {
                    intData = this.getNextBits(7);
                    if (intData < 10) strData += "0";
                    length -= 2;
                }
                else if (length == 1) {
                    intData = this.getNextBits(4);
                    length -= 1;
                }
                strData += intData;
            }
            while (length > 0);

            return strData;
        };
        this.get8bitByteArray=function( dataLength) {
            var length = dataLength,
                intData = 0,
                output = [];

            do {
                intData = this.getNextBits(8);
                output.push( intData);
                length--;
            }
            while (length > 0);
            return output;
        };
        this.getKanjiString=function( dataLength) {
            var length = dataLength,
                intData = 0,
                unicodeString = "";
            do {
                intData = getNextBits(13);
                var lowerByte = intData % 0xC0,
                    higherByte = intData / 0xC0,
                    tempWord = (higherByte << 8) + lowerByte,
                    shiftjisWord = 0;
                if (tempWord + 0x8140 <= 0x9FFC) {
                    // between 8140 - 9FFC on Shift_JIS character set
                    shiftjisWord = tempWord + 0x8140;
                }
                else {
                    // between E040 - EBBF on Shift_JIS character set
                    shiftjisWord = tempWord + 0xC140;
                }

                //var tempByte = new Array(0,0);
                //tempByte[0] = (sbyte) (shiftjisWord >> 8);
                //tempByte[1] = (sbyte) (shiftjisWord & 0xFF);
                //unicodeString += new String(SystemUtils.ToCharArray(SystemUtils.ToByteArray(tempByte)));
                unicodeString += String.fromCharCode(shiftjisWord);
                length--;
            }
            while (length > 0);


            return unicodeString;
        };

        this.__defineGetter__("DataByte", function() {
            var output = [],
                MODE_NUMBER = 1,
                MODE_ROMAN_AND_NUMBER = 2,
                MODE_8BIT_BYTE = 4,
                MODE_KANJI = 8;
            do {
                var mode = this.NextMode();
                //canvas.println("mode: " + mode);
                if (mode == 0) {
                    if (output.length > 0)
                        break;
                    else
                        throw "Empty data block";
                }
                //if (mode != 1 && mode != 2 && mode != 4 && mode != 8)
                //	break;
                //}
                if (mode != MODE_NUMBER && mode != MODE_ROMAN_AND_NUMBER && mode != MODE_8BIT_BYTE && mode != MODE_KANJI) {
                    /*					canvas.println("Invalid mode: " + mode);
                     mode = guessMode(mode);
                     canvas.println("Guessed mode: " + mode); */
                    throw "Invalid mode: " + mode + " in (block:" + this.blockPointer + " bit:" + this.bitPointer + ")";
                }
                var dataLength = this.getDataLength(mode);
                if (dataLength < 1) throw "Invalid data length: " + dataLength;
                //canvas.println("length: " + dataLength);
                var temp_str, ta, j;
                switch (mode) {

                    case MODE_NUMBER:
                        //canvas.println("Mode: Figure");
                        temp_str = this.getFigureString(dataLength);
                        ta = new Array(temp_str.length);

                        for(j=0;j<temp_str.length;j++)
                            ta[j]=temp_str.charCodeAt(j);

                        output.push(ta);

                        break;

                    case MODE_ROMAN_AND_NUMBER:
                        //canvas.println("Mode: Roman&Figure");
                        temp_str = this.getRomanAndFigureString(dataLength);
                        ta = [temp_str.length];

                        for(j=0;j<temp_str.length;j++)
                            ta[j]=temp_str.charCodeAt(j);

                        output.push(ta );
                        //output.Write(SystemUtils.ToByteArray(temp_sbyteArray2), 0, temp_sbyteArray2.Length);

                        break;

                    case MODE_8BIT_BYTE:
                        //canvas.println("Mode: 8bit Byte");
                        //sbyte[] temp_sbyteArray3;
                        var temp_sbyteArray3 = this.get8bitByteArray(dataLength);
                        output.push(temp_sbyteArray3);
                        //output.Write(SystemUtils.ToByteArray(temp_sbyteArray3), 0, temp_sbyteArray3.Length);

                        break;

                    case MODE_KANJI:
                        //canvas.println("Mode: Kanji");
                        //sbyte[] temp_sbyteArray4;
                        //temp_sbyteArray4 = SystemUtils.ToSByteArray(SystemUtils.ToByteArray(getKanjiString(dataLength)));
                        //output.Write(SystemUtils.ToByteArray(temp_sbyteArray4), 0, temp_sbyteArray4.Length);
                        temp_str = this.getKanjiString(dataLength);
                        output.push(temp_str);

                        break;
                }
                //
                //canvas.println("DataLength: " + dataLength);
                //Console.out.println(dataString);
            }
            while (true);
            return output;
        });
    };

    return {
        qrcode : qrcode
    }

}());