function App(ctx) {
    this.layer = new Layer(ctx);
    this.fps = 60;
    this.time = 1 / this.fps;
    this.intervalID = 0;
    this.isRunned = false;

    this.start = function () {
        if (!this.isRunned) {
            this.isRunned = true;

            var self = this;
            this.intervalID = setInterval(function () {
                self.layer.clearAll();
                self.layer.updateAll(self.time);
                self.layer.renderAll();
            }, this.time);
        }
    };

    this.stop = function () {
        if (this.isRunned) {
            clearInterval(this.intervalID);
            this.isRunned = false;
        }
    };
}

function Layer(ctx) {
    this.background = '#282829';
    this.ctx = ctx;
    this.items = {};
    this.logic = null;

    this.renderAll = function () {
        this.ctx.fillStyle = this.background;
        this.ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        this.ctx.fillStyle = '#fff';

        for (var index in this.items) {
            if (this.items.hasOwnProperty(index)) {
                this.items[index].render(this.ctx);
            }
        }
    };

    this.setLogic = function (exectutableFunction) {
        this.logic = exectutableFunction;
    };

    this.updateLogic = function (time) {
        if (this.logic) {
            this.logic(time);
        }

    };

    this.updateAll = function (time) {

        this.updateLogic(time);
        for (var index in this.items) {

            if (this.items.hasOwnProperty(index)) {
                this.items[index].update(time);
            }
        }
    };

    this.clearAll = function () {
        this.ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    };

    this.add = function (name, object) {
        this.items[name] = object;
    };

    this.remove = function (name) {
        delete this.items[name];
    }
}
