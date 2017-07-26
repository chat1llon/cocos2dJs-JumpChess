/**
 * Created by aoyue on 17/7/21.
 */
var GameLayer=cc.Layer.extend({
//0为黑色方在下,1为白色方在上
    cheeseArray:[],
    selectCheese:null,
    lastCheese:null,
    originX:null,
    originY:null,
    moveDone:true,
    canMove:false,
    currentTurn:0,
    currentTurnDisplay:null,

    ctor:function () {
        this._super();
        //加载背景
        this.loadBackground();
        //初始化棋子布局
        this.initCheese();
        //在游戏层添加监听事件
        this.listener();
        //碰撞及移动合法性检测
        this.schedule(this.collision);
        this.schedule(this.cheeseCanMove);
        //变王后检测
        this.schedule(this.evolution);
        //加载回合状态栏
        this.loadCurrentRound();
    },
    evolution:function () {
        var target=this.selectCheese;
        var cheeses=this.cheeseArray;
        if(target&&this.moveDone){
            for(var i in cheeses){
                var cheese=cheeses[i];
                switch (cheese.type){
                    case 0:
                        if(cheese.y==916.5){
                        cheese.evolutionChess();
                        }
                        break;
                    case 1:
                        if(cheese.y==80){
                        cheese.evolutionChess();
                        }
                        break;
                }
            }
        }
    },
    collision:function () {

        var target=this.selectCheese;
        var startX=this.originX;
        var startY=this.originY;
        var cheeses=this.cheeseArray;
        if(target&&this.moveDone) {
        switch (target.evolution) {
         case true:        //王的走法
             //正常移动 不能吃棋
             if((Math.abs(target.y-startY)==119.5)&&(Math.abs(target.x-startX)==119.5)){
                 for(var m in cheeses){
                     var cheese5=cheeses[m];
                     if(cc.rectIntersectsRect(cheese5.getBoundingBox(),target.getBoundingBox())&&(cheese5.getTag()!=target.getTag())){
                         this.canMove=false;
                         break;
                     }else{
                         this.canMove=true;
                     }
                 }
             }else if((Math.abs(target.y-startY)==239)&&(Math.abs(target.x-startX)==239)){           //吃棋的走法
                for(var n in cheeses){
                    var cheese6=cheeses[n];
                    //检测移动位置上有无棋子
                    if(cc.rectIntersectsRect(cheese6.getBoundingBox(),target.getBoundingBox())&&(cheese6.getTag()!=target.getTag())){
                        this.canMove=false;
                        break;
                    }else if(cheese6.getTag()!=target.getTag()){
                        switch (target.y-startY){    //判断前后移动方向
                            case 239:                         //向前移动
                                switch (target.x-startX){    //判断左右移动方向
                                    case 239:                //向右移动
                                        var targetPoint5=cc.rect(target.getBoundingBox().x-119.5,target.getBoundingBox().y-119.5);
                                        if(cc.rectContainsPoint(cheese6.getBoundingBox(),targetPoint5)){
                                            if(cheese6.type==target.type){
                                                this.canMove=false;
                                            }else{
                                                this.canMove=true;
                                                this.cheeseArray.splice(this.cheeseArray.indexOf(cheese6),1);
                                                cheese6.removeFromParent();
                                            }
                                        }
                                        break;
                                    case -239:               //向左移动
                                        var targetPoint6=cc.rect(target.getBoundingBox().x+119.5,target.getBoundingBox().y-119.5);
                                        if(cc.rectContainsPoint(cheese6.getBoundingBox(),targetPoint6)){
                                            if(cheese6.type==target.type){
                                                this.canMove=false;
                                            }else{
                                                this.canMove=true;
                                                this.cheeseArray.splice(this.cheeseArray.indexOf(cheese6),1);
                                                cheese6.removeFromParent();
                                            }
                                        }
                                        break;
                                }
                                break;
                            case -239:                       //向后移动
                                switch (target.x-startX){    //判断左右移动方向
                                    case 239:                //向右移动
                                        var targetPoint7=cc.rect(target.getBoundingBox().x-119.5,target.getBoundingBox().y+119.5);
                                        if(cc.rectContainsPoint(cheese6.getBoundingBox(),targetPoint7)){
                                            if(cheese6.type==target.type){
                                                this.canMove=false;
                                            }else{
                                                this.canMove=true;
                                                this.cheeseArray.splice(this.cheeseArray.indexOf(cheese6),1);
                                                cheese6.removeFromParent();
                                            }
                                        }
                                        break;
                                    case -239:               //向左移动
                                        var targetPoint8=cc.rect(target.getBoundingBox().x+119.5,target.getBoundingBox().y+119.5);
                                        if(cc.rectContainsPoint(cheese6.getBoundingBox(),targetPoint8)){
                                            if(cheese6.type==target.type){
                                                this.canMove=false;
                                            }else{
                                                this.canMove=true;
                                                this.cheeseArray.splice(this.cheeseArray.indexOf(cheese6),1);
                                                cheese6.removeFromParent();
                                            }
                                        }
                                        break;
                                }
                                break;
                            default:cc.log(target.y-startY);
                                break;
                        }
                    }
                    }
                }else{
                     this.canMove=false;
             }
         break;
         case false:       //普通棋子的走法 先区分阵营
         switch (target.type){
         case 0:     //黑色方 斜向左上或右上走一格
         if((target.y-startY==119.5)&&(Math.abs(target.x-startX)==119.5)){
         //正常移动 写碰撞检测 不能吃子
         for(var i in cheeses){
         var cheese1=cheeses[i];
         if(cc.rectIntersectsRect(cheese1.getBoundingBox(),target.getBoundingBox())&&(cheese1.getTag()!=target.getTag())){
             this.canMove=false;
             break;
         }else{
             this.canMove=true;
         }
                               }
         }else if((target.y-startY==239)&&(Math.abs(target.x-startX))==239){
             //写吃子逻辑 斜向移动两格 碰撞检测移动路径上有对方棋子
         for(var j in cheeses){
             //移动位置没有棋子 有棋子则返回
             var cheese2=cheeses[j];
             if(cc.rectIntersectsRect(cheese2.getBoundingBox(),target.getBoundingBox())&&(cheese2.getTag()!=target.getTag())){
                 this.canMove=false;
                 break;
             }else{
                 if(cheese2.getTag()!=target.getTag()){
                 switch (target.x-startX){      //判断移动方向
                 case 239:                       //向右移动
                 var targetPoint1=cc.rect(target.getBoundingBox().x-119.5,target.getBoundingBox().y-119.5);
                     if(cc.rectContainsPoint(cheese2.getBoundingBox(),targetPoint1)){
                      if(cheese2.type==target.type){
                          this.canMove=false;
                      }else{
                          this.canMove=true;
                          this.cheeseArray.splice(this.cheeseArray.indexOf(cheese2),1);
                          cheese2.removeFromParent();
                      }
                     }
                         break;
                 case -239:                      //向左移动
                     var targetPoint2=cc.rect(target.getBoundingBox().x+119.5,target.getBoundingBox().y-119.5);
                         if(cc.rectContainsPoint(cheese2.getBoundingBox(),targetPoint2)){
                             if(cheese2.type==target.type){
                                 this.canMove=false;
                             }else{
                                 this.canMove=true;
                                 this.cheeseArray.splice(this.cheeseArray.indexOf(cheese2),1);
                                 cheese2.removeFromParent();
                             }
                         }
                         break;
             }}}
         }
         }else{
             this.canMove=false;
         }
         break;
       case 1:      //白色方
           if((startY-target.y==119.5)&&(Math.abs(target.x-startX)==119.5)){
               //正常移动 写碰撞检测 不能吃子
               for(var k in cheeses){
                   var cheese3=cheeses[k];
                   if(cc.rectIntersectsRect(cheese3.getBoundingBox(),target.getBoundingBox())&&(cheese3.getTag()!=target.getTag())){
                       this.canMove=false;
                       break;
                   }else{
                       this.canMove=true;
                   }
               }
           }else if((startY-target.y==239)&&(Math.abs(target.x-startX))==239){
               //写吃子逻辑 斜向移动两格 碰撞检测移动路径上有对方棋子
               for(var l in cheeses){
                   //移动位置没有棋子 有棋子则返回
                   var cheese4=cheeses[l];
                   if(cc.rectIntersectsRect(cheese4.getBoundingBox(),target.getBoundingBox())&&(cheese4.getTag()!=target.getTag())){
                       this.canMove=false;
                       break;
                   }else{
                       if(cheese4.getTag()!=target.getTag()){
                           switch (target.x-startX){      //判断移动方向
                               case 239:                       //向右移动
                                   var targetPoint3=cc.rect(target.getBoundingBox().x-119.5,target.getBoundingBox().y+119.5);
                                   if(cc.rectContainsPoint(cheese4.getBoundingBox(),targetPoint3)){
                                       if(cheese4.type==target.type){
                                           this.canMove=false;
                                       }else{
                                           this.canMove=true;
                                           this.cheeseArray.splice(this.cheeseArray.indexOf(cheese4),1);
                                           cheese4.removeFromParent();
                                       }
                                   }
                                   break;
                               case -239:                      //向左移动
                                   var targetPoint4=cc.rect(target.getBoundingBox().x+119.5,target.getBoundingBox().y+119.5);
                                   if(cc.rectContainsPoint(cheese4.getBoundingBox(),targetPoint4)){
                                       if(cheese4.type==target.type){
                                           this.canMove=false;
                                       }else{
                                           this.canMove=true;
                                           this.cheeseArray.splice(this.cheeseArray.indexOf(cheese4),1);
                                           cheese4.removeFromParent();
                                       }
                                   }
                                   break;
                           }}}
               }
           }else{
               this.canMove=false;
           }
                    }
                    break;
                default:
                    this.canMove=false; }


                                   }
    },
    cheeseCanMove:function () {
      var canmove=this.canMove;
      var target=this.selectCheese;
      var startX=this.originX;
      var startY=this.originY;
        if(target&&this.moveDone) {
            if (!canmove) {
                target.x = startX;
                target.y = startY;
                this.moveDone=false;
                cc.log("1");
                if(this.currentTurn==0){
                    this.currentTurn=1;
                }else{
                    this.currentTurn=0;
                }
                this.updateCurrentRound(this.currentTurn);
            }
        }
    },
    listener:function () {
        cc.eventManager.addListener({
           event:cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches:true,
            onTouchBegan:this.onTouchBegan,
            onTouchMoved:this.onTouchMoved,
            onTouchEnded:this.onTouchEnded
        },this);
    },
    onTouchBegan:function (touch,event) {
         var touchXY=touch.getLocation();
         var target=event.getCurrentTarget();
         var checkCheese=target.cheeseArray;
         for(var i in checkCheese){
             var check=checkCheese[i];
             var rect=cc.rect(check.x-check.width/2,check.y-check.height/2,check.width*2,check.height*2);
             if(cc.rectContainsPoint(rect,touchXY)&&((target.currentTurn==0&&(check.getTag()<15))||(target.currentTurn==1&&(check.getTag()>15)))){
                 target.moveDone=false;
                 target.selectCheese=check;
                 target.lastCheese=check;
                 target.originX=check.x;
                 target.originY=check.y;
                 return true;
             }
         }
    },
    onTouchMoved:function (touch,event) {
        var target=event.getCurrentTarget().selectCheese;
        var delta=touch.getDelta();
        target.x+=delta.x;
        target.y+=delta.y;
    },
    onTouchEnded:function (touch,event) {
        var target=event.getCurrentTarget().selectCheese;
        var tempX=target.x;
        var tempY=target.y;
        target.transToPos(tempX,tempY);
        event.getCurrentTarget().moveDone=true;
        if(event.getCurrentTarget().currentTurn==0){
            event.getCurrentTarget().currentTurn=1;
        }else{
            event.getCurrentTarget().currentTurn=0;
        }
        event.getCurrentTarget().canMove=false;
        event.getCurrentTarget().updateCurrentRound(event.getCurrentTarget().currentTurn);
    },

    loadBackground:function () {

        var bg=new cc.Sprite(res.chessBoard);
        bg.setPosition(cc.winSize.width/2,bg.height/2);
        this.addChild(bg);
    },
    initCheese:function () {
        var w1=new cheese(1);
        this.cheeseArray.push(w1);
        this.addChild(w1);
        w1.setPos(2,8);
        w1.setTag(20);

        var w2=new cheese(1);
        this.cheeseArray.push(w2);
        this.addChild(w2);
        w2.setPos(4,8);
        w2.setTag(21);

        var w3=new cheese(1);
        this.cheeseArray.push(w3);
        this.addChild(w3);
        w3.setPos(6,8);
        w3.setTag(22);

        var w4=new cheese(1);
        this.cheeseArray.push(w4);
        this.addChild(w4);
        w4.setPos(8,8);
        w4.setTag(23);

        var w5=new cheese(1);
        this.cheeseArray.push(w5);
        this.addChild(w5);
        w5.setPos(1,7);
        w5.setTag(24);

        var w6=new cheese(1);
        this.cheeseArray.push(w6);
        this.addChild(w6);
        w6.setPos(3,7);
        w6.setTag(25);

        var w7=new cheese(1);
        this.cheeseArray.push(w7);
        this.addChild(w7);
        w7.setPos(5,7);
        w7.setTag(26);

        var w8=new cheese(1);
        this.cheeseArray.push(w8);
        this.addChild(w8);
        w8.setPos(7,7);
        w8.setTag(27);

        var w9=new cheese(1);
        this.cheeseArray.push(w9);
        this.addChild(w9);
        w9.setPos(2,6);
        w9.setTag(28);

        var w10=new cheese(1);
        this.cheeseArray.push(w10);
        this.addChild(w10);
        w10.setPos(4,6);
        w10.setTag(29);

        var w11=new cheese(1);
        this.cheeseArray.push(w11);
        this.addChild(w11);
        w11.setPos(6,6);
        w11.setTag(30);

        var w12=new cheese(1);
        this.cheeseArray.push(w12);
        this.addChild(w12);
        w12.setPos(8,6);
        w12.setTag(31);


        var b1=new cheese(0);
        this.cheeseArray.push(b1);
        this.addChild(b1);
        b1.setPos(1,1);
        b1.setTag(0);

        var b2=new cheese(0);
        this.cheeseArray.push(b2);
        this.addChild(b2);
        b2.setPos(3,1);
        b2.setTag(1);

        var b3=new cheese(0);
        this.cheeseArray.push(b3);
        this.addChild(b3);
        b3.setPos(5,1);
        b3.setTag(2);

        var b4=new cheese(0);
        this.cheeseArray.push(b4);
        this.addChild(b4);
        b4.setPos(7,1);
        b4.setTag(3);

        var b6=new cheese(0);
        this.cheeseArray.push(b6);
        this.addChild(b6);
        b6.setPos(2,2);
        b6.setTag(5);

        var b7=new cheese(0);
        this.cheeseArray.push(b7);
        this.addChild(b7);
        b7.setPos(4,2);
        b7.setTag(6);

        var b8=new cheese(0);
        this.cheeseArray.push(b8);
        this.addChild(b8);
        b8.setPos(6,2);
        b8.setTag(7);

        var b9=new cheese(0);
        this.cheeseArray.push(b9);
        this.addChild(b9);
        b9.setPos(8,2);
        b9.setTag(8);

        var b10=new cheese(0);
        this.cheeseArray.push(b10);
        this.addChild(b10);
        b10.setPos(1,3);
        b10.setTag(9);

        var b11=new cheese(0);
        this.cheeseArray.push(b11);
        this.addChild(b11);
        b11.setPos(3,3);
        b11.setTag(10);

        var b12=new cheese(0);
        this.cheeseArray.push(b12);
        this.addChild(b12);
        b12.setPos(5,3);
        b12.setTag(11);

        var b13=new cheese(0);
        this.cheeseArray.push(b13);
        this.addChild(b13);
        b13.setPos(7,3);
        b13.setTag(12);



    },
    updateCurrentRound:function (currentTurn) {
        var turn=null;
      if(currentTurn==0){
           turn="黑棋";
      }else{
          turn="白棋";
      }
      this.currentTurnDisplay.setString("当前回合是: "+turn);
      this.currentTurnDisplay.stopAllActions();
    },
    loadCurrentRound:function () {
        var currentRound=new cc.Sprite(res.currentRound);
        currentRound.setPosition(currentRound.width/2+30,cc.winSize.height-currentRound.height/2-30);
        this.addChild(currentRound);
        this.currentTurnDisplay=new cc.LabelTTF("当前回合是: 黑棋","Arial",28);
        this.currentTurnDisplay.setPosition(45,cc.winSize.height-currentRound.height/2-30);
        this.currentTurnDisplay.getColor(cc.color(255,255,255,255));
        this.currentTurnDisplay.setAnchorPoint(0,0.5);
        this.addChild(this.currentTurnDisplay);
    }

});
var beganLayer=cc.Layer.extend({
     ctor:function () {
      this._super();
     },
    onEnter:function () {
        this._super();
        this.arrow=new cc.Sprite(res.arrow);
        this.addChild(this.arrow);
        this.arrow.setPosition(cc.pAdd(cc.visibleRect.bottom,cc.p(0,50)));
        var posY = this.arrow.y;
        var arrowAction = cc.repeatForever(cc.sequence(
            cc.spawn(cc.moveTo(1.3, cc.p(this.arrow.x, posY + 30)).easing(cc.easeIn(0.8)), cc.fadeOut(1.5)),
            cc.delayTime(0.8),
            cc.callFunc(function () {
                this.arrow.y = this.arrow.y - 30;
                this.arrow.opacity = 255;
            }, this)));
        this.arrow.runAction(arrowAction);

        var title=new cc.Sprite(res.title);
        title.setPosition(cc.pAdd(cc.visibleRect.center,cc.p(0,150)));
        title.setScale(1.5);
        this.addChild(title);
     },


});
var GameScene=cc.Scene.extend({
    ctor:function () {
    this._super();
},
   onEnter:function () {
       this._super();
       this.initUI();
       var layer=new GameLayer();
       this.addChild(layer);
   },
   initUI:function () {
       var background=new cc.Sprite(res.background);
       background.setPosition(cc.winSize.width/2,cc.winSize.height/2);
       this.addChild(background);

    }

});