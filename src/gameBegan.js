var beganScene=cc.Scene.extend({
   ctor:function () {
       this._super();
     var bg=new cc.Sprite(res.background);
     bg.setPosition(cc.winSize.width/2,cc.winSize.height/2);
     this.addChild(bg);

     var title=new cc.Sprite(res.title);
     title.setPosition(cc.pAdd(cc.visibleRect.center,cc.p(0,150)));
     this.addChild(title);
   },
   onEnter:function () {
       this._super();
       var arrow = new cc.Sprite(res.arrow);
       arrow.setPosition(cc.pAdd(cc.visibleRect.bottom, cc.p(0, 50)));
       var posY = arrow.y;
       var arrowAction = cc.repeatForever(cc.sequence(cc.spawn(cc.moveTo(0.8, cc.p(arrow.x, posY + 30)).easing(cc.easeIn(0.5)),
           cc.fadeOut(1)), cc.delayTime(0.8), cc.callFunc(function () {
           arrow.y = arrow.y - 30;
           arrow.opacity = 255;
       }, this)));
       arrow.runAction(arrowAction);
       this.addChild(arrow, 1);

       cc.eventManager.addListener({
           event:cc.EventListener.TOUCH_ONE_BY_ONE,
           swallowTouches:true,
           startY:0,
           onTouchBegan:function (touch,event) {
               this.startY=touch.getLocation().y;
               return true;
           },
           onTouchEnded:function (touch,event) {
               var delta=touch.getLocation().y-this.startY;
               if(delta>15){
                   cc.director.runScene(new GameScene());
               }
           }
       },this)
   }
});