/* Qixian Phone - SillyTavern Extension v2.0 */
(function(){
'use strict';

var FLOAT_ID='qixian-float', CSS_ID='qixian-phone-styles', PANEL_ID='qixian-phone-panel', TOGGLE_ID='qixian-toggle-btn';

/* ============ CSS (scoped, no global pollution) ============ */
var CSS = `
#qixian-float{position:fixed;bottom:20px;right:20px;z-index:999999;font-family:-apple-system,BlinkMacSystemFont,"Helvetica Neue",Arial,sans-serif;}
#qixian-float *{box-sizing:border-box;margin:0;padding:0;}
#qixian-float ::-webkit-scrollbar{display:none;width:0;height:0;}
#qixian-toggle-btn{width:48px;height:48px;border-radius:50%;background:#222;color:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 4px 16px rgba(0,0,0,.3);transition:transform .2s;user-select:none;}
#qixian-toggle-btn:active{transform:scale(.92);}
#qixian-toggle-btn svg{width:26px;height:26px;fill:none;stroke:currentColor;stroke-width:1.8;}
#qixian-phone-panel{display:none;width:360px;max-width:90vw;animation:qf-in .25s ease;}
#qixian-phone-panel.show{display:block;}
@keyframes qf-in{from{opacity:0;transform:translateY(10px) scale(.96);}to{opacity:1;transform:translateY(0) scale(1);}}
.Qixian-mu-inp-wrap,.Qixian-mu-ctrl,.Qixian-mu-time-disp,.Qixian-mu-now,.Qixian-mu-stage,.Qixian-mu-invbtn{flex-shrink:0!important;}
.Qixian-mu-list{display:flex;flex-direction:column;gap:6px;flex:1 1 auto;min-height:120px;max-height:240px!important;overflow-y:auto!important;padding-bottom:10px;scrollbar-width:none;}
.Qixian-mu-item{display:flex;justify-content:space-between;align-items:center;padding:12px 14px;background:rgba(250,250,250,.85);border-radius:12px;font-size:12px;color:#444;cursor:pointer;transition:background .2s,transform .1s;border:1px solid rgba(0,0,0,.02);flex-shrink:0;}
.Qixian-mu-item:active{transform:scale(.98);background:rgba(240,240,240,.9);}
.Qixian-mu-item.active{background:#333!important;color:#fff!important;font-weight:600;}
.Qixian-home-screen{position:absolute;inset:0;background-color:#f2f2f7;background-image:url('https://tuchuang.org.cn/imgs/2026/07/10/cdf179abe6c5f102.png');background-size:cover;background-position:center;background-repeat:no-repeat;z-index:200;display:flex;flex-direction:column;transition:transform .35s cubic-bezier(.2,.8,.2,1);transform:translateX(-100%);border-radius:inherit;overflow:hidden;}
.Qixian-home-screen.active{transform:translateX(0);}
.Qixian-ios-statusbar{position:absolute;top:0;left:0;right:0;height:44px;display:flex;justify-content:space-between;align-items:center;padding:0 24px;font-size:14px;font-weight:600;color:var(--hdr-txt,#222);z-index:210;font-family:-apple-system,BlinkMacSystemFont,"Helvetica Neue",sans-serif;letter-spacing:.5px;text-shadow:0 1px 4px rgba(255,255,255,.6);}
.Qixian-ios-statusbar-right{display:flex;align-items:center;gap:6px;}
.Qixian-ios-statusbar-right svg{height:12px;fill:var(--hdr-txt,#222);filter:drop-shadow(0 1px 2px rgba(255,255,255,.5));}
.Qixian-ios-battery{width:22px;height:11px;border:1px solid var(--hdr-txt,rgba(0,0,0,.6));border-radius:4px;position:relative;padding:1px;display:flex;box-shadow:0 1px 2px rgba(255,255,255,.5);}
.Qixian-ios-battery::after{content:'';position:absolute;right:-4px;top:3px;width:2px;height:3px;background:var(--hdr-txt,rgba(0,0,0,.6));border-radius:0 2px 2px 0;}
.Qixian-ios-battery-level{background:var(--hdr-txt,#222);height:100%;width:85%;border-radius:1px;}
.Qixian-sticky-note{position:absolute;top:80px;left:50%;transform:translateX(-50%);width:80%;max-width:280px;background:rgba(255,255,255,.95);border-radius:4px;box-shadow:2px 6px 16px rgba(0,0,0,.06);padding:24px 16px 16px;display:flex;flex-direction:column;z-index:50;backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);}
.Qixian-sticky-tape{position:absolute;top:-14px;left:50%;transform:translateX(-50%) rotate(-3deg);width:110px;height:32px;background:rgba(255,255,255,.35);box-shadow:0 1px 3px rgba(0,0,0,.05);backdrop-filter:blur(3px);-webkit-backdrop-filter:blur(3px);border:1px solid rgba(255,255,255,.4);border-radius:2px;pointer-events:none;z-index:51;}
.Qixian-sticky-textarea{width:100%;min-height:140px;border:none;background:transparent;resize:none;outline:none;font-size:15px;color:#333;line-height:1.6;font-family:'Kaiti','Comic Sans MS',-apple-system,sans-serif;overflow-y:auto;scrollbar-width:none;font-weight:500;}
.Qixian-sticky-btn{align-self:flex-end;margin-top:8px;background:#222;color:#fff;border:none;border-radius:14px;padding:6px 16px;font-size:12px;cursor:pointer;opacity:0;transition:opacity .3s,transform .1s;font-weight:500;}
.Qixian-sticky-note:focus-within .Qixian-sticky-btn{opacity:1;}
.Qixian-sticky-btn:active{transform:scale(.95);}
.Qixian-dock{position:absolute;bottom:24px;left:20px;right:20px;height:68px;background:rgba(255,255,255,.85);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border-radius:24px;display:flex;justify-content:space-evenly;align-items:center;padding:0 10px;box-shadow:0 4px 20px rgba(0,0,0,.04);border:1px solid rgba(0,0,0,.02);}
.Qixian-dock-icon{width:48px;height:48px;border-radius:14px;background:transparent;display:flex;justify-content:center;align-items:center;cursor:pointer;transition:transform .2s,background .2s;}
.Qixian-dock-icon:active{transform:scale(.9);background:rgba(0,0,0,.05);}
.Qixian-dock-icon svg{width:28px;height:28px;stroke:#222;stroke-width:1.5;fill:none;}
#qixian-float #app-wechat svg{width:25px;height:25px;}
.Qixian-hd-back{cursor:pointer;padding:4px;display:flex;align-items:center;color:var(--hdr-ic,#333);margin-right:4px;transition:opacity .2s;flex-shrink:0;}
.Qixian-hd-back:active{opacity:.6;}
.Qixian-hd-back svg{width:22px;height:22px;stroke:currentColor;fill:none;stroke-width:1.5;}
.Qixian-sys-app{position:absolute;inset:0;background:#fff;z-index:250;display:flex;flex-direction:column;transform:translateX(100%);transition:transform .3s;border-radius:inherit;}
.Qixian-sys-app.show{transform:translateX(0);}
.Qixian-sys-app-hd{padding:40px 16px 16px;background:rgba(255,255,255,.9);backdrop-filter:blur(10px);font-size:16px;font-weight:500;display:flex;align-items:center;gap:12px;border-bottom:.5px solid rgba(0,0,0,.05);z-index:10;}
.Qixian-sys-app-body{flex:1;overflow-y:auto;padding:0;scrollbar-width:none;display:flex;flex-direction:column;background:#fff;}
.Qixian-phone-app-container{display:flex;flex-direction:column;height:100%;width:100%;}
.Qixian-phone-content{flex:1;overflow-y:auto;scrollbar-width:none;background:#fff;padding-bottom:20px;}
.Qixian-phone-tabbar{display:flex;justify-content:space-around;padding:10px 0 20px;border-top:.5px solid rgba(0,0,0,.05);background:rgba(250,250,250,.95);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);}
.Qixian-ptab{font-size:10px;color:#888;cursor:pointer;transition:color .2s;display:flex;flex-direction:column;align-items:center;gap:4px;font-weight:500;}
.Qixian-ptab svg{width:22px;height:22px;stroke:currentColor;fill:none;stroke-width:1.5;}
.Qixian-ptab.active{color:#222;}
.Qixian-list-item{padding:14px 20px;border-bottom:.5px solid rgba(0,0,0,.03);display:flex;justify-content:space-between;align-items:center;cursor:pointer;background:#fff;transition:background .2s;}
.Qixian-list-item:active{background:#f9f9f9;}
.Qixian-item-title{font-size:15px;font-weight:500;color:#222;}
.Qixian-item-sub{font-size:12px;color:#888;margin-top:4px;}
.Qixian-item-arrow svg{width:16px;height:16px;stroke:#ccc;fill:none;stroke-width:1.5;}
.Qixian-contact-detail{padding:20px;display:flex;flex-direction:column;gap:20px;animation:Qixian-pop .3s forwards;}
.Qixian-c-av-wrap{display:flex;justify-content:center;margin-bottom:10px;}
.Qixian-c-av{width:80px;height:80px;border-radius:50%;background:#f0f0f0;display:flex;justify-content:center;align-items:center;font-size:32px;color:#888;font-weight:300;}
.Qixian-c-input-grp{display:flex;flex-direction:column;gap:6px;}
.Qixian-c-input-grp label{font-size:12px;color:#888;margin-left:4px;}
.Qixian-c-input{width:100%;border:none;border-bottom:1px solid rgba(0,0,0,.1);padding:12px 4px;font-size:16px;color:#222;outline:none;background:transparent;transition:border-color .3s;}
.Qixian-c-input:focus{border-bottom-color:#222;}
.Qixian-c-btns{display:flex;gap:12px;margin-top:10px;}
.Qixian-c-btn{flex:1;padding:14px;border-radius:12px;border:none;font-size:14px;font-weight:500;cursor:pointer;text-align:center;transition:transform .1s,opacity .2s;}
.Qixian-c-btn:active{transform:scale(.98);opacity:.8;}
.Qixian-c-btn.call{background:#333;color:#fff;}
.Qixian-c-btn.save{background:#f2f2f7;color:#222;}
.Qixian-dial-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px 24px;max-width:260px;margin:0 auto;padding-top:20px;}
.Qixian-dial-key{width:68px;height:68px;border-radius:50%;background:#f2f2f7;display:flex;flex-direction:column;justify-content:center;align-items:center;font-size:28px;font-weight:300;color:#222;cursor:pointer;transition:transform .1s,background .1s;border:1px solid rgba(0,0,0,.02);}
.Qixian-dial-key:active{transform:scale(.9);background:#e5e5ea;}
.Qixian-dial-callbtn{width:68px;height:68px;border-radius:50%;background:#34c759;display:flex;justify-content:center;align-items:center;cursor:pointer;margin:30px auto 0;transition:transform .1s;box-shadow:0 4px 12px rgba(52,199,89,.3);}
.Qixian-dial-callbtn:active{transform:scale(.9);}
.Qixian-dial-callbtn svg{width:30px;height:30px;stroke:#fff;stroke-width:1.5;fill:none;}
.Qixian-stage{width:100%;display:flex;justify-content:center;padding:10px 0;font-family:-apple-system,BlinkMacSystemFont,"Helvetica Neue",Arial,sans-serif;touch-action:pan-y;--wrap-bg:#e0e0e0;--hdr-bg:rgba(255,255,255,.85);--ftr-bg:rgba(255,255,255,.9);--bub-r:rgba(245,245,245,.9);--bub-l:rgba(255,255,255,.9);--txt-main:#222;--wv-bg:#aaa;--sys-txt:#888;--card-txt:#222;--hdr-txt:#333;--hdr-ic:#333;--card-ic:#333;--pull-bg:rgba(200,200,200,.3);--card-bg:rgba(255,255,255,.7);--call-bub-l:rgba(250,250,250,.9);--call-bub-r:rgba(240,240,240,.9);--call-bub-txt:#222;--blur-val:16px;}
#qixian-float input::-webkit-outer-spin-button,#qixian-float input::-webkit-inner-spin-button{-webkit-appearance:none;margin:0;}
#qixian-float input[type=number]{-moz-appearance:textfield;}
.Qixian-root.solid-mode{--blur-val:0px!important;}
.Qixian-root.solid-mode .Qixian-hd,.Qixian-root.solid-mode .Qixian-ft,.Qixian-root.solid-mode .Qixian-hd-pull{backdrop-filter:none!important;-webkit-backdrop-filter:none!important;}
.Qixian-root.av-sq .Qixian-uav,.Qixian-root.av-sq .Qixian-rav,.Qixian-root.av-sq .Qixian-lav,.Qixian-root.av-sq .Qixian-call-av,.Qixian-root.av-sq .Qixian-cp-face,.Qixian-root.av-sq .Qixian-pyq-iav,.Qixian-root.av-sq .Qixian-pyq-uav,.Qixian-root.av-sq .Qixian-mu-face,.Qixian-root.av-sq .Qixian-anchor-av{border-radius:10px!important;}
.Qixian-root.av-sq .Qixian-call.minimized:not(.video) .Qixian-call-av{border-radius:6px!important;}
.Qixian-phone-wrap{padding:6px;background:var(--wrap-bg);border-radius:42px;display:flex;justify-content:center;align-items:center;width:100%;max-width:360px;transition:background .3s;}
.Qixian-phone{width:100%;height:510px;background:#fdfdfd;border-radius:36px;position:relative;overflow:hidden;-webkit-mask-image:-webkit-radial-gradient(white,black);transform:translateZ(0);display:flex;flex-direction:column;box-sizing:border-box;}
.Qixian-bg{position:absolute;inset:-2px;z-index:0;background-size:cover;background-position:center;background-repeat:no-repeat;background-color:#f7f7f7;transition:background-image .3s;border-radius:inherit;}
.Qixian-content-layer{position:relative;z-index:1;display:flex;flex-direction:column;width:100%;height:100%;}
.Qixian-hd{position:absolute;top:0;left:0;right:0;padding:20px 14px 8px;display:flex;align-items:center;justify-content:space-between;background:var(--hdr-bg);backdrop-filter:blur(var(--blur-val));-webkit-backdrop-filter:blur(var(--blur-val));z-index:50;transition:transform .35s cubic-bezier(.2,.8,.2,1),background .3s;border-bottom:.5px solid rgba(0,0,0,.03);}
.Qixian-hd.collapsed{transform:translateY(-100%);}
.Qixian-notch{position:absolute;top:0;left:50%;transform:translateX(-50%);width:70px;height:16px;background:#222;border-radius:0 0 10px 10px;z-index:30;}
.Qixian-hd-pull{position:absolute;bottom:-16px;left:50%;transform:translateX(-50%);width:44px;height:16px;background:var(--pull-bg);backdrop-filter:blur(var(--blur-val));-webkit-backdrop-filter:blur(var(--blur-val));border-radius:0 0 14px 14px;display:flex;justify-content:center;align-items:center;cursor:pointer;z-index:100;color:var(--sys-txt);transition:all .3s;pointer-events:auto;}
.Qixian-hd.collapsed .Qixian-hd-pull svg{transform:rotate(180deg);}
.Qixian-hd-ph{width:4px;}
.Qixian-hd-mid{display:flex;align-items:center;gap:12px;flex:1;justify-content:flex-start;margin-left:2px;}
.Qixian-ubox{display:flex;flex-direction:column;align-items:center;gap:4px;width:56px;}
.Qixian-uav{width:32px;height:32px;aspect-ratio:1;border-radius:50%;background-size:cover;background-position:center;cursor:pointer;transition:border-radius .3s;border:.5px solid rgba(0,0,0,.05);}
.Qixian-uname{font-size:11px;font-weight:500;color:var(--hdr-txt,#222);width:100%;text-align:center;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;outline:none;cursor:text;padding:2px;border-radius:4px;transition:background .2s,color .3s;}
.Qixian-uname:focus{background:rgba(0,0,0,.05);}
.Qixian-waves{display:flex;align-items:center;gap:3px;height:20px;}
.Qixian-wave{width:2px;background:var(--wv-bg);border-radius:10px;opacity:.85;animation:Qixian-jp 1s ease-in-out infinite alternate;transition:background .3s;}
.Qixian-wave:nth-child(2){animation-delay:.3s}.Qixian-wave:nth-child(3){animation-delay:.15s}.Qixian-wave:nth-child(4){animation-delay:.5s}.Qixian-wave:nth-child(5){animation-delay:.25s}.Qixian-wave:nth-child(6){animation-delay:.4s}
@keyframes Qixian-jp{0%{height:4px}100%{height:16px}}
.Qixian-icons-rt{display:flex;gap:6px;align-items:center;}
.Qixian-icbtn{padding:4px;cursor:pointer;color:var(--hdr-ic,#333)!important;transition:opacity .2s;}
.Qixian-icbtn:active{opacity:.6;}
.Qixian-icbtn svg{width:20px;height:20px;fill:none!important;stroke:var(--hdr-ic,#333)!important;stroke-width:1.5;}
.Qixian-chat{flex:1;padding:14px;padding-top:76px;display:flex;flex-direction:column;gap:14px;overflow-y:auto;touch-action:pan-y;z-index:5;scrollbar-width:none;overscroll-behavior:contain;position:relative;transition:padding-top .35s cubic-bezier(.2,.8,.2,1);}
.Qixian-chat.collapsed{padding-top:26px;}
.Qixian-row{display:flex;gap:8px;max-width:95%;opacity:0;animation:Qixian-pop .4s forwards cubic-bezier(.2,.8,.2,1);position:relative;transition:transform .2s,filter .2s;}
@keyframes Qixian-pop{from{transform:translateY(6px);opacity:0;}to{transform:translateY(0);opacity:1;}}
.Qixian-row.left{align-self:flex-start;}
.Qixian-row.right{align-self:flex-end;flex-direction:row-reverse;}
.Qixian-rav,.Qixian-lav{width:32px;height:32px;border-radius:50%;background-size:cover;background-position:center;flex-shrink:0;user-select:none;transition:border-radius .3s;border:.5px solid rgba(0,0,0,.05);}
.Qixian-ct{display:flex;flex-direction:column;gap:4px;max-width:calc(100% - 40px);position:relative;}
.Qixian-row.right .Qixian-ct{align-items:flex-end;}
.Qixian-err-icon{display:none;width:18px;height:18px;border-radius:50%;border:1.5px solid #444;color:#444;background:rgba(255,255,255,.9);align-items:center;justify-content:center;font-size:13px;font-weight:bold;cursor:pointer;flex-shrink:0;align-self:center;}
.Qixian-row.has-err .Qixian-err-icon{display:flex;animation:Qixian-pop .3s forwards;}
.Qixian-sys-msg{width:100%;text-align:center;font-size:11px;color:var(--sys-txt);font-weight:400;opacity:0;animation:Qixian-pop .4s forwards;padding:4px 0;transition:color .3s;}
.Qixian-view-rev{color:#444;font-weight:500;cursor:pointer;margin-left:4px;border-bottom:.5px solid #444;}
.Qixian-bub{padding:10px 14px;font-size:13px;line-height:1.5;color:var(--txt-main);word-wrap:break-word;word-break:break-all;white-space:pre-wrap;cursor:pointer;position:relative;backdrop-filter:blur(var(--blur-val));-webkit-backdrop-filter:blur(var(--blur-val));transition:background .3s,backdrop-filter .3s;font-weight:400;border:.5px solid rgba(0,0,0,.03);}
.Qixian-row.left .Qixian-bub{background:var(--bub-l);border-radius:4px 18px 18px 18px;}
.Qixian-row.right .Qixian-bub{background:var(--bub-r);border-radius:18px 4px 18px 18px;}
@keyframes Qx-poke{0%{transform:scale(1) rotate(0);}20%{transform:scale(1.1) rotate(-15deg) translateX(-4px);}40%{transform:scale(1.1) rotate(15deg) translateX(4px);}60%{transform:scale(1.1) rotate(-15deg) translateX(-4px);}80%{transform:scale(1.1) rotate(15deg) translateX(4px);}100%{transform:scale(1) rotate(0);}}
@keyframes Qx-dice{0%{transform:translateY(0) rotate(0);}25%{transform:translateY(-12px) rotate(90deg);}50%{transform:translateY(0) rotate(180deg);}75%{transform:translateY(-6px) rotate(270deg);}100%{transform:translateY(0) rotate(360deg);}}
@keyframes Qx-rps{0%{transform:scale(.3);opacity:0;}50%{transform:scale(1.2);opacity:1;}100%{transform:scale(1);opacity:1;}}
.Qixian-interact-item{display:flex;flex-direction:column;align-items:center;justify-content:center;padding:4px;background:transparent;border:none;box-shadow:none;color:#444;margin:4px 0;}
.Qixian-interact-item svg{width:44px;height:44px;stroke:currentColor;fill:none;stroke-width:1.5;}
.Qixian-anim-poke svg{animation:Qx-poke .6s ease-in-out;}
.Qixian-anim-dice svg{animation:Qx-dice .7s ease-in-out;}
.Qixian-anim-rps svg{animation:Qx-rps .5s cubic-bezier(.175,.885,.32,1.275);}
.Qixian-row.right .Qixian-interact-item{align-items:flex-end;}
.Qixian-row.left .Qixian-interact-item{align-items:flex-start;}
.Qixian-img{width:140px;max-width:100%;border-radius:14px;display:block;background:transparent;object-fit:cover;cursor:pointer;border:.5px solid rgba(0,0,0,.03);}
.Qixian-txt-img{display:flex!important;justify-content:center!important;align-items:center!important;width:150px!important;max-width:100%!important;aspect-ratio:1!important;background:linear-gradient(135deg,var(--bub-l),var(--bub-r))!important;backdrop-filter:blur(var(--blur-val))!important;-webkit-backdrop-filter:blur(var(--blur-val))!important;border-radius:18px!important;padding:14px!important;font-size:13px!important;font-weight:400!important;color:var(--txt-main)!important;text-align:center!important;word-wrap:break-word!important;white-space:pre-wrap!important;line-height:1.5!important;cursor:pointer!important;overflow:hidden!important;border:.5px solid rgba(0,0,0,.03)!important;box-shadow:none!important;transition:all .3s;}
.Qixian-txt-img:active{filter:brightness(.95);}
.Qixian-quote-box{position:relative;font-size:11px;color:inherit;opacity:.75;background:rgba(0,0,0,.02);padding:8px 12px;border-radius:10px;margin-bottom:8px;word-wrap:break-word;white-space:pre-wrap;display:block;width:100%;max-width:220px;box-sizing:border-box;overflow:hidden;}
.Qixian-reply-bar{display:none;background:rgba(255,255,255,.85);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);border-radius:14px;padding:8px 14px;font-size:12px;color:#666;margin:10px 0 8px;justify-content:space-between;align-items:center;border:.5px solid rgba(0,0,0,.03);}
.Qixian-reply-bar.show{display:flex;}
.Qixian-reply-txt{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:85%;font-weight:400;}
.Qixian-reply-txt::before{content:'引用：';color:#444;font-size:11px;margin-right:4px;font-weight:500;}
.Qixian-reply-close{cursor:pointer;font-weight:300;color:#888;padding:0 4px;font-size:18px;}
.Qixian-au{padding:10px 14px;cursor:pointer;overflow:hidden;transition:all .3s;backdrop-filter:blur(var(--blur-val));-webkit-backdrop-filter:blur(var(--blur-val));user-select:none;border:.5px solid rgba(0,0,0,.03);}
.Qixian-row.left .Qixian-au{background:var(--bub-l);border-radius:4px 18px 18px 18px;}
.Qixian-row.right .Qixian-au{background:var(--bub-r);border-radius:18px 4px 18px 18px;}
.Qixian-au-main{display:flex;align-items:center;gap:8px;width:130px;pointer-events:none;}
.Qixian-au-play{width:0;height:0;border-top:5px solid transparent;border-bottom:5px solid transparent;border-left:7px solid #888;transition:border-left-color .2s;}
.Qixian-au.playing .Qixian-au-play{border-left-color:#222;}
.Qixian-au-bars{flex:1;display:flex;align-items:center;gap:2px;height:10px;}
.Qixian-au-bars span{width:2px;height:100%;background:rgba(0,0,0,.1);border-radius:1px;transition:height .2s,background .2s;}
.Qixian-au-bars span:nth-child(even){height:60%}.Qixian-au-bars span:nth-child(3n){height:85%}
.Qixian-au.playing .Qixian-au-bars span{background:#222;animation:Qixian-bar-jump .4s infinite alternate;}
.Qixian-au.playing .Qixian-au-bars span:nth-child(2){animation-delay:.1s}.Qixian-au.playing .Qixian-au-bars span:nth-child(3){animation-delay:.2s}.Qixian-au.playing .Qixian-au-bars span:nth-child(4){animation-delay:.3s}
@keyframes Qixian-bar-jump{0%{transform:scaleY(.4);}100%{transform:scaleY(1.3);}}
.Qixian-au-dur{font-size:11px;font-weight:400;color:#666;pointer-events:none;}
.Qixian-au-wrap{display:grid;grid-template-rows:0fr;transition:grid-template-rows .35s;}
.Qixian-au.open .Qixian-au-wrap{grid-template-rows:1fr;}
.Qixian-au-txt{overflow:hidden;font-size:12px;color:var(--txt-main);word-wrap:break-word;white-space:pre-wrap;border-top:.5px solid transparent;transition:all .3s;opacity:.8;font-weight:300;}
.Qixian-au.open .Qixian-au-txt{border-top-color:rgba(0,0,0,.05);margin-top:8px;padding-top:8px;}
.Qixian-meta{display:flex;align-items:center;gap:4px;font-size:10px;color:#aaa;margin-top:2px;font-weight:300;}
.Qixian-tick{color:#aaa;font-size:11px;letter-spacing:-1.5px;font-weight:400;}
.Qixian-tf,.Qixian-link-card,.Qixian-gift-card,.Qixian-mu-invite-card,.Qixian-loc-card,.Qixian-food-card{background:var(--card-bg);backdrop-filter:blur(var(--blur-val));-webkit-backdrop-filter:blur(var(--blur-val));border-radius:16px;padding:14px;display:flex;align-items:center;gap:12px;width:210px;cursor:pointer;text-decoration:none;transition:filter .2s,opacity .2s,background .3s;border:.5px solid rgba(0,0,0,.03);}
.Qixian-tf-ic{width:34px;height:34px;background:rgba(0,0,0,.03);border-radius:50%;display:flex;justify-content:center;align-items:center;font-weight:400;font-size:15px;color:var(--card-ic,#222);flex-shrink:0;transition:all .3s;}
.Qixian-tf.got,.Qixian-tf.returned{opacity:.75;}
.Qixian-tf.got .Qixian-tf-ic,.Qixian-tf.returned .Qixian-tf-ic{background:rgba(0,0,0,.02);color:#888;}
.Qixian-link-ic,.Qixian-food-ic{width:36px;height:36px;background:transparent;border-radius:10px;display:flex;justify-content:center;align-items:center;flex-shrink:0;}
.Qixian-link-ic svg,.Qixian-food-ic svg{width:18px;height:18px;fill:none;stroke:var(--card-ic,#222);stroke-width:1.5px;transition:stroke .3s;}
.Qixian-tf-info{display:flex;flex-direction:column;gap:2px;flex:1;min-width:0;pointer-events:none;}
.Qixian-tf-t{font-size:13px;font-weight:500;color:var(--card-txt,var(--txt-main));white-space:nowrap;overflow:hidden;text-overflow:ellipsis;transition:color .3s;letter-spacing:.2px;}
.Qixian-tf-a{font-size:11px;color:var(--sys-txt);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-weight:300;}
.Qixian-tf-f{font-size:10px;color:var(--txt-main);opacity:.4;margin-top:4px;padding-top:4px;font-weight:300;}
.Qixian-cp-qacard{width:auto;max-width:240px;align-items:flex-start;flex-direction:column;gap:6px;background:var(--card-bg);backdrop-filter:blur(var(--blur-val));-webkit-backdrop-filter:blur(var(--blur-val));border-radius:18px;padding:16px;cursor:pointer;transition:filter .2s,background .3s;border:.5px solid rgba(0,0,0,.03);}
.Qixian-cp-qacard .Qixian-tf-t{font-size:11px;font-weight:500;color:var(--sys-txt);letter-spacing:.5px;width:100%;display:flex;align-items:center;gap:6px;text-transform:uppercase;}
.Qixian-cp-qatxt{font-size:13px;color:var(--txt-main);line-height:1.5;font-weight:400;width:100%;word-break:break-word;padding-top:4px;pointer-events:none;}
.Qixian-music-share-card{flex-direction:column;align-items:stretch;width:230px;padding:14px;gap:12px;border-radius:18px;}
.Qixian-msc-top{display:flex;align-items:center;gap:12px;}
.Qixian-msc-cover{width:46px;height:46px;border-radius:10px;background-size:cover;background-position:center;position:relative;flex-shrink:0;}
.Qixian-msc-playic{position:absolute;inset:0;background:rgba(0,0,0,.2);border-radius:10px;display:flex;justify-content:center;align-items:center;}
.Qixian-msc-playic svg{width:18px;height:18px;fill:rgba(255,255,255,.9);}
.Qixian-msc-info{display:flex;flex-direction:column;min-width:0;flex:1;}
.Qixian-msc-name{font-size:13px;font-weight:500;color:var(--txt-main);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;line-height:1.3;}
.Qixian-msc-artist{font-size:11px;color:var(--sys-txt);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin-top:2px;font-weight:300;}
.Qixian-msc-bot{padding-top:8px;display:flex;align-items:center;gap:6px;font-size:10px;color:#888;font-weight:400;}
.Qixian-msc-bot svg{width:14px;height:14px;stroke:#888;}
.Qixian-ft{background:var(--ftr-bg);backdrop-filter:blur(var(--blur-val));-webkit-backdrop-filter:blur(var(--blur-val));padding:0 14px 14px;display:flex;flex-direction:column;flex-shrink:0;z-index:10;transition:background .3s;border-top:.5px solid rgba(0,0,0,.03);}
.Qixian-in-area{display:flex;gap:8px;align-items:center;padding-top:10px;}
.Qixian-lang{width:34px;height:28px;font-size:11px;display:flex;justify-content:center;align-items:center;background:rgba(0,0,0,.03);border-radius:10px;cursor:pointer;color:#555;font-weight:500;flex-shrink:0;}
.Qixian-plus{width:28px;height:28px;display:flex;justify-content:center;align-items:center;cursor:pointer;transition:transform .3s;flex-shrink:0;}
.Qixian-plus svg{width:22px;height:22px;stroke:#444;stroke-width:1.5px;fill:none;}
.Qixian-plus.on{transform:rotate(45deg);}
.Qixian-input{flex:1;min-width:0;height:36px;border-radius:18px;background:rgba(240,240,240,.8)!important;padding:0 16px;font-size:13px;outline:none;border:none;color:#222;font-weight:400;}
.Qixian-mic,.Qixian-send{width:28px;height:28px;display:flex;justify-content:center;align-items:center;cursor:pointer;color:#444;flex-shrink:0;}
.Qixian-mic svg,.Qixian-send svg{width:18px;height:18px;fill:none;stroke:currentColor;stroke-width:1.5px;}
.Qixian-mic.rec{color:#222;animation:Qixian-pl 1s infinite alternate;}
.Qixian-panel{max-height:0;overflow:hidden;transition:max-height .3s ease;display:grid;grid-template-columns:repeat(4,1fr);gap:16px 6px;}
.Qixian-panel.show{max-height:280px;padding-top:16px;overflow-y:auto;scrollbar-width:none;}
.Qixian-pi{display:flex;flex-direction:column;align-items:center;gap:8px;cursor:pointer;position:relative;}
.Qixian-pic{width:46px;height:46px;background:rgba(0,0,0,.02);border-radius:14px;display:flex;justify-content:center;align-items:center;border:.5px solid rgba(0,0,0,.03);}
.Qixian-pic svg{width:22px;height:22px;fill:none;stroke:#333;stroke-width:1.2px;}
.Qixian-ptx{font-size:10px;color:#777;font-weight:400;text-align:center;white-space:nowrap;}
.Qixian-call{position:absolute;inset:0;background:#fdfdfd;z-index:9999;display:flex;flex-direction:column;opacity:0;pointer-events:none;transition:all .35s cubic-bezier(.2,.8,.2,1);border-radius:inherit;overflow:hidden;}
.Qixian-call.show{opacity:1;pointer-events:auto;}
.Qixian-call-vbg{position:absolute;inset:0;background-size:cover;background-position:center;background-image:url('');filter:blur(20px) brightness(.9) grayscale(.2);opacity:0;transition:all .3s;z-index:1;}
.Qixian-call:not(.video) .Qixian-call-vbg{opacity:1;}
.Qixian-call.video .Qixian-call-vbg{opacity:1;filter:blur(10px) brightness(.9) grayscale(.2);}
.Qixian-call-pip{position:absolute;top:30px;right:16px;width:70px;height:100px;background-size:cover;border-radius:12px;z-index:20;opacity:0;transition:opacity .3s;border:.5px solid rgba(255,255,255,.2);}
.Qixian-call.video .Qixian-call-pip{opacity:1;}
.Qixian-call-mini-top{position:absolute;top:20px;left:16px;z-index:60;cursor:pointer;color:#333;padding:4px;display:flex;align-items:center;justify-content:center;transition:color .2s,transform .2s;}
.Qixian-call.video .Qixian-call-mini-top{color:rgba(255,255,255,.9);}
.Qixian-call-mini-top:active{transform:scale(.85);}
.Qixian-call-mini-top svg{width:24px;height:24px;stroke:currentColor;stroke-width:1.5;fill:none;}
.Qixian-call.minimized .Qixian-call-mini-top{display:none;}
.Qixian-call-ct{position:relative;z-index:10;display:flex;flex-direction:column;height:100%;padding:10px 16px 16px;transition:padding .3s;}
.Qixian-call-avs{display:flex;justify-content:center;align-items:center;margin-bottom:12px;transition:transform .4s cubic-bezier(.2,.8,.2,1);}
.Qixian-call.active .Qixian-call-avs{transform:scale(.85) translateY(-10px);}
.Qixian-call-av{width:84px;height:84px;border-radius:50%;background-size:cover;position:relative;transition:border-radius .3s,width .4s,height .4s;border:.5px solid rgba(0,0,0,.05);}
.Qixian-jcall-lav{z-index:1;}
.Qixian-jcall-rav{margin-left:-20px;z-index:2;}
.Qixian-call.active .Qixian-call-av{width:64px;height:64px;}
.Qixian-call.video .Qixian-call-avs{transform:scale(0);height:0;margin:0;opacity:0;display:none;}
.Qixian-call-nm{text-align:center;font-size:20px;font-weight:500;color:#222;z-index:10;letter-spacing:.5px;transition:font-size .4s;margin-bottom:6px;}
.Qixian-call.active .Qixian-call-nm{font-size:16px;margin-bottom:0px;}
.Qixian-call.video .Qixian-call-nm{color:#fff!important;font-weight:500;text-shadow:0 1px 4px rgba(0,0,0,.3);}
.Qixian-call-st{text-align:center;font-size:12px;color:#888;margin-bottom:8px;z-index:10;font-weight:300;transition:all .3s;}
.Qixian-call.active .Qixian-call-st{display:none;}
.Qixian-call.video .Qixian-call-st{color:rgba(255,255,255,.8)!important;font-weight:400;text-shadow:0 1px 3px rgba(0,0,0,.3);}
.Qixian-call-timer{text-align:center;font-size:10px;color:#555;font-family:-apple-system,sans-serif;font-weight:400;margin-bottom:8px;z-index:10;display:none;transition:opacity .3s;}
.Qixian-call.active .Qixian-call-timer{display:block;opacity:1;}
.Qixian-call.video .Qixian-call-timer{color:#fff!important;text-shadow:0 1px 3px rgba(0,0,0,.3);}
.Qixian-call-bubs{flex:1;display:flex;flex-direction:column;justify-content:flex-start;gap:8px;margin-bottom:16px;overflow-y:auto;z-index:10;padding:0 4px;scrollbar-width:none;opacity:0;transition:opacity .3s;touch-action:pan-y;-webkit-overflow-scrolling:touch;}
.Qixian-call-bubs::before{content:"";flex:1 1 auto;min-height:0;}
.Qixian-call.active .Qixian-call-bubs{opacity:1;}
.Qixian-cb-wrap{display:flex;flex-direction:column;}
.Qixian-cb-wrap.left{align-items:flex-start;}.Qixian-cb-wrap.right{align-items:flex-end;}
.Qixian-cb{background:var(--call-bub-l,rgba(250,250,250,.9));backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);color:var(--call-bub-txt,#222);padding:10px 14px;border-radius:16px;font-size:13px;max-width:85%;animation:Qixian-pop .3s forwards cubic-bezier(.2,.8,.2,1);font-weight:400;border:.5px solid rgba(0,0,0,.03);}
.Qixian-cb-wrap.right .Qixian-cb{background:var(--call-bub-r,rgba(240,240,240,.9));}
.Qixian-call .Qixian-call-ft{display:flex!important;flex-direction:column;gap:20px;z-index:99999!important;padding-bottom:10px;}
.Qixian-call-btns{display:none!important;justify-content:space-evenly!important;padding:0 30px!important;animation:Qixian-pop .3s!important;}
.Qixian-call.state-out .btns-out{display:flex!important;}
.Qixian-call.state-in .btns-in{display:flex!important;}
.Qixian-call-btn{width:64px!important;height:64px!important;border-radius:50%!important;display:flex!important;justify-content:center!important;align-items:center!important;cursor:pointer!important;transition:transform .1s,background .2s!important;}
.Qixian-call-btn:active{transform:scale(.92)!important;}
.Qixian-call-btn.hangup{background:#fff!important;color:#222!important;box-shadow:0 2px 8px rgba(0,0,0,.15)!important;border:1px solid rgba(0,0,0,.1)!important;}
.Qixian-call-btn.answer{background:#fff!important;color:#222!important;box-shadow:0 2px 8px rgba(0,0,0,.15)!important;border:1px solid rgba(0,0,0,.1)!important;}
.Qixian-call-btn.cancel{background:#f5f5f5!important;color:#666!important;box-shadow:0 2px 8px rgba(0,0,0,.1)!important;border:1px solid rgba(0,0,0,.08)!important;}
.Qixian-call-btn svg{width:28px!important;height:28px!important;stroke:currentColor!important;stroke-width:1.8!important;fill:none!important;}
.Qixian-call-inrow{display:none!important;gap:10px;align-items:center;background:rgba(250,250,250,0.9)!important;backdrop-filter:blur(10px);padding:6px 8px!important;height:36px!important;border-radius:22px;animation:Qixian-pop .3s;border:.5px solid rgba(0,0,0,.03);z-index:99999!important;}
.Qixian-call.active .Qixian-call-inrow{display:flex!important;}
.Qixian-call-in{flex:1;border:none;background:transparent;padding:0 8px!important;height:24px!important;font-size:12px!important;outline:none;color:#222;min-width:0;font-weight:400;}
.Qixian-call.active .Qixian-call-btn.mini{width:28px!important;height:28px!important;flex-shrink:0;box-shadow:none!important;}
.Qixian-call.active .Qixian-call-btn.mini svg{width:16px!important;height:16px!important;}
.Qixian-call.active .Qixian-call-send{height:24px!important;padding:0 12px!important;font-size:11px!important;background:#222;color:#fff;border-radius:16px;font-weight:500;cursor:pointer;transition:background .2s;border:none;}
.Qixian-call.minimized{cursor:grab;}
.Qixian-call.minimized:active{cursor:grabbing;}
.Qixian-call.minimized.video{top:16px;right:16px;bottom:auto;left:auto;width:84px;height:134px;border-radius:14px;padding:0;background:#000;overflow:hidden;}
.Qixian-call.minimized.video .Qixian-call-vbg{display:block!important;opacity:1!important;filter:none!important;z-index:1;}
.Qixian-call.minimized.video .Qixian-call-pip{display:block!important;opacity:1!important;width:26px;height:38px;top:6px;right:6px;border-radius:6px;z-index:25;border:none;}
.Qixian-call.minimized.video .Qixian-call-ct{display:flex!important;flex-direction:column;justify-content:flex-end;align-items:center;padding:8px!important;z-index:10;background:linear-gradient(to top,rgba(0,0,0,.5),transparent 60%);height:100%;}
.Qixian-call.minimized.video .Qixian-call-avs,.Qixian-call.minimized.video .Qixian-call-nm,.Qixian-call.minimized.video .Qixian-call-st,.Qixian-call.minimized.video .Qixian-call-bubs,.Qixian-call.minimized.video .Qixian-call-ft{display:none!important;}
.Qixian-call.minimized.video .Qixian-call-timer{display:block!important;margin:0;padding:0;font-size:11px;color:#fff!important;font-weight:400;text-shadow:0 1px 4px rgba(0,0,0,.5);letter-spacing:.5px;opacity:1;}
.Qixian-call.minimized:not(.video){top:60px;right:16px;bottom:auto;left:auto;width:auto;min-width:104px;height:42px;border-radius:21px;background:rgba(250,250,250,.95);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);padding:0 16px;display:flex;flex-direction:row;justify-content:center;align-items:center;overflow:visible;border:.5px solid rgba(0,0,0,.05);}
.Qixian-call.minimized:not(.video) .Qixian-call-vbg{display:none;}
.Qixian-call.minimized:not(.video) .Qixian-call-ct{padding:0;flex-direction:row;justify-content:space-between;align-items:center;width:100%;gap:10px;}
.Qixian-call.minimized:not(.video) .Qixian-call-avs{margin:0;transform:none;display:flex!important;opacity:1!important;height:auto;pointer-events:none;}
.Qixian-call.minimized:not(.video) .Qixian-call-av{width:24px;height:24px;}
.Qixian-call.minimized:not(.video) .Qixian-jcall-rav{margin-left:-10px;z-index:2;}
.Qixian-call.minimized:not(.video) .Qixian-call-nm,.Qixian-call.minimized:not(.video) .Qixian-call-st{display:none;}
.Qixian-call.minimized:not(.video) .Qixian-call-timer{display:block!important;font-size:13px;font-weight:500;color:#222!important;margin:0;text-shadow:none;pointer-events:none;letter-spacing:.5px;opacity:1;}
.Qixian-call.minimized .Qixian-call-bubs,.Qixian-call.minimized .Qixian-call-ft,.Qixian-call.minimized:not(.video) .Qixian-call-pip{display:none!important;}
.Qixian-call-mini-hint{display:none;position:absolute;inset:0;z-index:50;}
.Qixian-call.minimized .Qixian-call-mini-hint{display:block;}
.Qixian-set{position:absolute;inset:0;background:rgba(255,255,255,.95);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);z-index:100;display:flex;flex-direction:column;transform:translateX(100%);transition:transform .3s;padding:24px;overflow-y:auto;scrollbar-width:none;}
.Qixian-set.show{transform:translateX(0);}
.Qixian-set-h{font-size:18px;font-weight:500;margin-bottom:16px;display:flex;justify-content:space-between;align-items:center;color:#222;}
.Qixian-set-x{font-size:24px;cursor:pointer;color:#888;width:32px;height:32px;display:flex;justify-content:center;align-items:center;background:rgba(0,0,0,.03);border-radius:50%;font-weight:300;}
.Qixian-set-r{display:flex;justify-content:space-between;align-items:center;padding:14px 0;border-bottom:.5px solid rgba(0,0,0,.03);font-size:13px;color:#555;font-weight:400;}
.Qixian-color-wrap{display:flex;align-items:center;gap:8px;}
.Qixian-hex-in{width:70px;height:30px;border:none;border-radius:8px;padding:0 6px;font-size:11px;font-family:monospace;outline:none;background:rgba(0,0,0,.03);color:#222;text-align:center;}
.Qixian-color-wrap input[type=color]{border:none;width:30px;height:30px;border-radius:8px;cursor:pointer;background:none;padding:0;}
.Qixian-bg-btn{padding:6px 12px;height:30px;border-radius:8px;border:none;background:#f2f2f7;cursor:pointer;font-size:12px;color:#333;outline:none;font-weight:500;transition:background .2s,color .2s;}
.Qixian-bg-btn.active{background:#222;color:#fff;}
.Qixian-mf{position:absolute;inset:0;background:rgba(0,0,0,.15);z-index:50;display:flex;flex-direction:column;justify-content:flex-end;opacity:0;pointer-events:none;transition:opacity .3s;backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);}
.Qixian-mf.show{opacity:1;pointer-events:auto;}
.Qixian-mbox{background:rgba(255,255,255,.98);height:75%;border-radius:28px 28px 0 0;display:flex;flex-direction:column;transform:translateY(100%);transition:transform .3s;}
.Qixian-mf.show .Qixian-mbox{transform:translateY(0);}
.Qixian-mh{display:flex;justify-content:space-between;align-items:center;padding:20px 24px 14px;font-weight:500;font-size:15px;color:#222;}
.Qixian-mc{width:28px;height:28px;background:rgba(0,0,0,.03);border-radius:50%;display:flex;justify-content:center;align-items:center;cursor:pointer;color:#888;font-weight:300;}
.Qixian-act-btn{padding:18px;text-align:center;font-size:15px;font-weight:400;color:#222;cursor:pointer;}
.Qixian-act-space{height:8px;background:rgba(0,0,0,.02);}
.Qixian-act-btn:active{background:rgba(0,0,0,.03);}
.Qixian-cen{position:absolute;inset:0;background:rgba(0,0,0,.25);z-index:999;display:none;justify-content:center;align-items:center;opacity:0;transition:opacity .3s;backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);}
.Qixian-cen.show{display:flex;opacity:1;}
.Qixian-cen-box{background:rgba(250,250,250,.98);width:260px;border-radius:20px;padding:24px;display:flex;flex-direction:column;gap:16px;transform:translateY(20px);transition:transform .3s;}
.Qixian-cen.show .Qixian-cen-box{transform:translateY(0);}
.Qixian-cen-box h4{text-align:center;font-size:15px;font-weight:500;color:#222;}
.Qixian-tf-grp{display:flex;align-items:baseline;border-bottom:1.5px solid rgba(0,0,0,.1);padding-bottom:6px;gap:8px;}
.Qixian-tf-grp input{border:none;font-size:26px;font-weight:400;width:100%;outline:none;background:transparent;color:#222;}
.Qixian-cen-inp,.Qixian-cen-box textarea{border:none;background:rgba(0,0,0,.03);padding:12px;border-radius:10px;font-size:13px;outline:none;resize:none;color:#222;width:100%;font-weight:400;}
.Qixian-cen-btns{display:flex;gap:12px;}
.Qixian-cen-btns button{flex:1;padding:12px;border-radius:12px;border:none;font-size:13px;font-weight:500;cursor:pointer;}
.Qixian-cen-btns .cc{background:rgba(0,0,0,.04);color:#55;}.Qixian-cen-btns .ok{background:#222;color:#fff;}
.Qixian-cen.w260 .Qixian-cen-box{width:280px;gap:12px;}
.Qixian-draw-canvas{border-radius:14px;background:#fff;touch-action:none;cursor:crosshair;display:block;margin:0 auto;border:.5px solid rgba(0,0,0,.03);}
.Qixian-draw-tools{display:flex;align-items:center;justify-content:space-between;gap:8px;width:100%;margin:6px 0;background:rgba(0,0,0,.02);padding:8px 10px;border-radius:14px;}
.Qixian-draw-color{width:26px;height:26px;border-radius:8px;cursor:pointer;padding:0;background:transparent;flex-shrink:0;border:none;}
.Qixian-draw-range{flex:1;accent-color:#222;height:4px;}
.Qixian-draw-btn-icon{width:28px;height:28px;border-radius:8px;background:rgba(0,0,0,.03);display:flex;justify-content:center;align-items:center;cursor:pointer;color:#444;flex-shrink:0;transition:transform .1s,background .2s;}
.Qixian-draw-btn-icon:active{transform:scale(.9);}
.Qixian-draw-btn-icon svg{stroke:currentColor;fill:none;width:16px;height:16px;stroke-width:1.5;}
.Qixian-txt-zoom{position:absolute;inset:0;background:rgba(250,250,250,.9);z-index:1000;display:none;justify-content:center;align-items:center;opacity:0;transition:opacity .3s;backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);padding:20px;cursor:zoom-out;}
.Qixian-txt-zoom.show{display:flex;opacity:1;align-items:center;}
.Qixian-txt-zoom-in{width:100%;max-width:300px;max-height:80vh;overflow-y:auto;scrollbar-width:none;background:#fff;border-radius:20px!important;padding:28px;font-size:16px;color:#222;display:flex;flex-direction:column;align-items:center;justify-content:flex-start;text-align:center;word-wrap:break-word;white-space:pre-wrap;font-weight:400;cursor:default;box-shadow:0 8px 30px rgba(0,0,0,.05);border:.5px solid rgba(0,0,0,.02);}
.Qixian-txt-zoom-in.txt-img-zoom{border:none!important;background:linear-gradient(135deg,var(--bub-l),var(--bub-r))!important;aspect-ratio:1;justify-content:center;border-radius:20px!important;padding:16px!important;}
.Qixian-txt-zoom-in.gift-zoom{justify-content:center;}
.Qixian-loc-wrap{flex:1;display:flex;flex-direction:column;align-items:center;position:relative;background:#fdfdfd;background-image:radial-gradient(rgba(0,0,0,.05) 1px,transparent 1px);background-size:20px 20px;border-radius:0 0 28px 28px;overflow:hidden;padding:24px 0;}
.Qixian-loc-dist{font-size:13px;color:#222;font-weight:500;margin-top:6px;padding:6px 14px;background:rgba(0,0,0,.03);border-radius:14px;}
.Qixian-radar{width:280px;height:280px;position:relative;margin:30px auto;display:flex;justify-content:center;align-items:center;}
.Qixian-radar-wave{position:absolute;width:100%;height:100%;border-radius:50%;background:radial-gradient(circle,rgba(0,0,0,.06) 0%,rgba(0,0,0,.02) 60%,transparent 80%);animation:Qixian-radar-pulse 3s ease-out infinite;opacity:0;}
.Qixian-radar-wave.w2{animation-delay:1.5s;width:80%;height:80%;}
@keyframes Qixian-radar-pulse{0%{opacity:0;transform:scale(.5);}50%{opacity:1;}100%{opacity:0;transform:scale(1.2);}}
.Qixian-anchor{position:absolute;display:flex;flex-direction:column;align-items:center;cursor:pointer;transition:transform .2s cubic-bezier(.2,.8,.2,1);z-index:5;}
.Qixian-anchor:active{transform:scale(1.08);}
.Qixian-anchor.a1{top:25%;left:15%;}
.Qixian-anchor.a2{bottom:20%;right:15%;}
.Qixian-anchor-av{width:46px;height:46px;border-radius:50%;background-size:cover;position:relative;z-index:2;transition:border-radius .3s;border:1px solid rgba(255,255,255,.8);box-shadow:0 4px 10px rgba(0,0,0,.05);}
.Qixian-anchor-tip{position:absolute;top:-38px;background:rgba(255,255,255,.95);backdrop-filter:blur(16px);padding:8px 14px;border-radius:16px;font-size:12px;color:#222;font-weight:500;white-space:nowrap;opacity:0;pointer-events:none;transition:all .2s;z-index:10;transform:translateY(4px);box-shadow:0 2px 8px rgba(0,0,0,.05);border:.5px solid rgba(0,0,0,.02);}
.Qixian-anchor:hover .Qixian-anchor-tip{opacity:1;transform:translateY(0);}
.Qixian-loc-send{margin-top:auto;background:#222;color:#fff;border-radius:18px;padding:14px 36px;font-size:14px;font-weight:500;cursor:pointer;border:none;}
.Qixian-mu,.Qixian-cp,.Qixian-emo{flex:1;display:flex;flex-direction:column;padding:20px;gap:20px;overflow-y:auto;scrollbar-width:none;}
.Qixian-mu-stage{display:flex;justify-content:center;align-items:center;gap:16px;}
.Qixian-mu-face{width:64px;height:64px;border-radius:50%;background-size:cover;transition:border-radius .3s;border:.5px solid rgba(0,0,0,.05);}
.Qixian-mu-waves{display:flex;align-items:center;justify-content:center;gap:6px;height:36px;width:48px;}
.Qixian-mu-waves .Qixian-wave{background:rgba(0,0,0,.1);width:3px;height:4px;border-radius:2px;transition:height .3s;}
.Qixian-mu-waves.playing .Qixian-wave{background:#222;animation:Qixian-jp 1s ease-in-out infinite alternate;}
.Qixian-mu-waves.playing .Qixian-wave:nth-child(2){animation-delay:.3s}
.Qixian-mu-waves.playing .Qixian-wave:nth-child(3){animation-delay:.15s}
.Qixian-mu-time-disp{text-align:center;font-size:12px;color:#555;font-weight:500;background:rgba(0,0,0,.02);padding:6px 14px;border-radius:16px;margin:0 auto;border:.5px solid rgba(0,0,0,.02);}
.Qixian-mu-ctrl{display:flex;justify-content:center;align-items:center;gap:28px;margin-top:12px;}
.Qixian-mu-btn{width:48px;height:48px;border-radius:50%;background:transparent;display:flex;justify-content:center;align-items:center;cursor:pointer;border:none;transition:transform .2s;}
.Qixian-mu-btn:active{transform:scale(.9);}
.Qixian-mu-btn svg{width:26px;height:26px;stroke:#222;fill:none;stroke-width:1.2;}
.Qixian-mu-btn.main svg{width:34px;height:34px;fill:#222;stroke:none;}
.Qixian-mu-inp-wrap{display:flex;gap:10px;}
.Qixian-mu-inp,.Qixian-mu-name,.Qixian-mu-artist,.Qixian-mu-cover{flex:1;border-radius:12px;padding:12px 14px;font-size:13px;background:rgba(0,0,0,.02);outline:none;border:none;color:#222;font-weight:400;}
.Qixian-mu-add{padding:0 16px;border:none;border-radius:12px;background:#222;color:#fff;font-size:13px;font-weight:500;}
.Qixian-mu-invbtn{margin-top:auto;padding:14px;border-radius:16px;background:rgba(0,0,0,.03);color:#222;font-size:14px;font-weight:500;cursor:pointer;border:none;}
.Qixian-emo-games{display:flex;gap:10px;padding:12px 20px;flex-shrink:0;align-items:center;}
.Qixian-emo-gamebtn{flex:1;display:flex;align-items:center;justify-content:center;gap:8px;background:rgba(0,0,0,.02);border-radius:14px;padding:10px 0;font-size:13px;color:#222;font-weight:500;cursor:pointer;transition:transform .1s,background .2s;border:.5px solid rgba(0,0,0,.02);}
.Qixian-emo-gamebtn:active{transform:scale(.95);background:rgba(0,0,0,.05);}
.Qixian-emo-gamebtn svg{width:18px;height:18px;stroke:currentColor;fill:none;stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round;}
.Qixian-emo-addbtn{width:36px;height:36px;flex-shrink:0;display:flex;justify-content:center;align-items:center;background:rgba(0,0,0,.02);border-radius:12px;cursor:pointer;transition:transform .1s,background .2s;border:.5px solid rgba(0,0,0,.02);}
.Qixian-emo-addbtn:active{transform:scale(.9);background:rgba(0,0,0,.06);}
.Qixian-emo-addbtn svg{width:18px;height:18px;stroke:#222;stroke-width:1.5;fill:none;}
.Qixian-emo{display:grid;grid-template-columns:repeat(2,1fr);align-content:start;gap:12px;padding-top:12px;}
.Qixian-emo-card{background:rgba(0,0,0,.02);border-radius:16px;padding:8px;display:flex;flex-direction:column;align-items:center;gap:8px;cursor:pointer;transition:transform .1s;border:.5px solid rgba(0,0,0,.02);}
.Qixian-emo-img{width:100%;aspect-ratio:1;object-fit:cover;border-radius:10px;pointer-events:none;border:none;}
.Qixian-emo-t{font-size:11px;color:#555;text-align:center;font-weight:400;}
.Qixian-cp-top{display:flex;flex-direction:column;align-items:center;gap:10px;}
.Qixian-cp-avs{display:flex;justify-content:center;align-items:center;}
.Qixian-cp-face{width:64px;height:64px;border-radius:50%;background-size:cover;transition:border-radius .3s;border:.5px solid rgba(0,0,0,.05);}
.Qixian-cp-face.Qixian-jcpf2{margin-left:-20px;position:relative;z-index:2;}
.Qixian-cp-id-group{font-size:14px;font-weight:500;color:#222;letter-spacing:.2px;display:flex;align-items:center;gap:8px;}
.Qixian-cp-rel{text-align:center;font-size:12px;color:#555;background:rgba(0,0,0,.02);border-radius:14px;padding:8px 16px;}
.Qixian-cp-sec{background:rgba(0,0,0,.02);border-radius:20px;padding:16px;transition:background .3s;border:.5px solid rgba(0,0,0,.02);}
.Qixian-cp-h{font-size:13px;font-weight:500;color:#222;margin-bottom:14px;display:flex;align-items:center;gap:8px;}
.Qixian-sign-mod{display:flex;flex-direction:column;gap:10px;background:rgba(255,255,255,.8);padding:14px;border-radius:16px;margin-bottom:12px;}
.Qixian-sign-hd{display:flex;align-items:center;gap:10px;}
.Qixian-sign-bd{font-size:12px;color:#444;line-height:1.5;padding-left:42px;word-wrap:break-word;font-weight:300;}
.Qixian-sign-act{display:flex;align-items:center;background:rgba(0,0,0,.03);border-radius:18px;padding:4px;margin-top:10px;}
.Qixian-jusignin{flex:1;border:none;background:transparent;padding:8px 12px;font-size:12px;outline:none;color:#222;min-width:0;font-weight:400;}
.Qixian-jusignsave{height:30px;padding:0 16px;border:none;border-radius:15px;background:#222;color:#fff;font-size:12px;font-weight:500;cursor:pointer;flex-shrink:0;}
.Qixian-signdel{cursor:pointer;color:#aaa;margin-left:auto;padding:4px;transition:color .2s;}
.Qixian-signdel:active{color:#666;}
.Qixian-cp-things,.Qixian-cp-days{display:flex;flex-direction:column;gap:8px;}
.Qixian-cp-thing{display:flex;align-items:center;gap:10px;font-size:13px;color:#333;padding:10px 14px;background:rgba(255,255,255,.8);border-radius:12px;font-weight:400;}
.Qixian-cp-thing .dot{width:16px;height:16px;border-radius:50%;border:1.5px solid #ccc;flex-shrink:0;cursor:pointer;}
.Qixian-cp-thing.done{opacity:.4;}.Qixian-cp-thing.done .dot{background:#ccc;border-color:#ccc;}
.Qixian-cp-addrow{display:flex;align-items:center;background:rgba(0,0,0,.02);border-radius:14px;padding:6px;margin-top:12px;gap:6px;flex-wrap:wrap;border:.5px solid rgba(0,0,0,.03);}
.Qixian-cp-addrow input,.Qixian-cp-addrow select{flex:1;min-width:60px;border:none;background:#fff;border-radius:10px;padding:8px 10px;font-size:12px;outline:none;color:#222;}
.Qixian-cp-addrow button{height:32px;padding:0 16px;border:none;border-radius:10px;background:#222;color:#fff;font-size:12px;font-weight:500;cursor:pointer;}
.Qixian-cp-day{display:flex;align-items:center;justify-content:space-between;padding:12px 16px;background:rgba(255,255,255,.8);border-radius:14px;}
.Qixian-cp-day span{font-size:14px;font-weight:500;color:#222;max-width:60%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.Qixian-cp-day b{color:#555;font-size:11px;font-weight:400;background:rgba(0,0,0,.03);padding:6px 12px;border-radius:20px;}
.Qixian-cp-albums{display:grid;grid-template-columns:repeat(2,1fr);gap:10px;padding:6px 0;}
.Qixian-cp-album-card{position:relative;background:rgba(255,255,255,.8);border-radius:16px;overflow:hidden;display:flex;flex-direction:column;cursor:pointer;border:.5px solid rgba(0,0,0,.03);}
.Qixian-cp-album-img{width:100%;aspect-ratio:1;background-size:cover;background-position:center;border:none;}
.Qixian-cp-album-txt{padding:8px 10px;font-size:11px;color:#333;font-weight:400;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;background:#fff;}
.Qixian-cp-album-txt-only{padding:14px;font-size:13px;color:#222;text-align:center;display:flex;align-items:center;justify-content:center;height:100%;aspect-ratio:1;background:#fff;font-weight:400;word-wrap:break-word;white-space:pre-wrap;overflow-y:auto;scrollbar-width:none;line-height:1.5;border:none;}
.Qixian-cp-album-who{position:absolute;top:6px;right:6px;background:rgba(0,0,0,.2);color:#fff;font-size:10px;padding:4px 8px;border-radius:10px;backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);pointer-events:none;font-weight:300;}
.Qixian-pyq-panel{position:absolute;inset:0;background:#fdfdfd;z-index:60;display:flex;flex-direction:column;transform:translateX(100%);transition:transform .3s cubic-bezier(.2,.8,.2,1);}
.Qixian-pyq-panel.show{transform:translateX(0);}
.Qixian-pyq-hd{padding:24px 20px 12px;display:flex;align-items:center;justify-content:space-between;background:rgba(253,253,253,.9);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);z-index:26;border-bottom:.5px solid rgba(0,0,0,.03);}
.Qixian-pyq-back{cursor:pointer;display:flex;align-items:center;color:#222;}
.Qixian-pyq-back svg{width:24px;height:24px;stroke:currentColor;stroke-width:1.5;fill:none;}
.Qixian-pyq-addbtn{width:36px;height:36px;border-radius:50%;background:rgba(0,0,0,.03);display:flex;justify-content:center;align-items:center;cursor:pointer;}
.Qixian-pyq-addbtn svg{width:18px;height:18px;stroke:#222;stroke-width:1.5;fill:none;}
.Qixian-pyq-scroll{flex:1;overflow-y:auto;scrollbar-width:none;padding-bottom:20px;}
.Qixian-pyq-cover{height:200px;background-color:#f0f0f0;background-size:cover;background-position:center;position:relative;cursor:pointer;}
.Qixian-pyq-user{position:absolute;right:20px;bottom:-24px;display:flex;align-items:flex-end;gap:14px;}
.Qixian-pyq-uname{font-size:16px;font-weight:600;color:#fff;text-shadow:0 1px 6px rgba(0,0,0,.4);margin-bottom:28px;letter-spacing:.5px;}
.Qixian-pyq-uav{width:72px;height:72px;border-radius:16px;background-size:cover;cursor:pointer;transition:border-radius .3s;border:1px solid rgba(255,255,255,.8);}
.Qixian-pyq-list{padding:48px 20px 20px;display:flex;flex-direction:column;gap:24px;}
.Qixian-pyq-item{display:flex;gap:12px;padding-bottom:20px;position:relative;border-bottom:.5px solid rgba(0,0,0,.03);}
.Qixian-pyq-delbtn{position:absolute;right:0;top:0;padding:6px;color:#ccc;cursor:pointer;transition:color .2s;}
.Qixian-pyq-delbtn:active{color:#888;}
.Qixian-pyq-delbtn svg{width:16px;height:16px;stroke:currentColor;fill:none;stroke-width:1.5;}
.Qixian-pyq-iav{width:44px;height:44px;border-radius:12px;background-size:cover;flex-shrink:0;transition:border-radius .3s;border:.5px solid rgba(0,0,0,.03);}
.Qixian-pyq-ict{flex:1;min-width:0;display:flex;flex-direction:column;gap:8px;}
.Qixian-pyq-inm{font-size:14px;font-weight:500;color:#222;letter-spacing:.2px;}
.Qixian-pyq-itxt{font-size:13px;color:#444;line-height:1.6;white-space:pre-wrap;word-break:break-word;font-weight:300;}
.Qixian-pyq-iimg{max-width:80%;border-radius:12px;margin-top:4px;display:block;border:.5px solid rgba(0,0,0,.03);}
.Qixian-pyq-txtimg{display:flex!important;justify-content:center!important;align-items:center!important;width:130px!important;aspect-ratio:1!important;background:rgba(0,0,0,.02)!important;border-radius:16px!important;padding:14px!important;font-size:14px!important;font-weight:400!important;color:#222!important;text-align:center!important;word-wrap:break-word!important;white-space:pre-wrap!important;line-height:1.5!important;cursor:pointer!important;overflow:hidden!important;margin-top:4px;border:.5px solid rgba(0,0,0,.03)!important;box-shadow:none!important;}
.Qixian-pyq-ibot{display:flex;justify-content:space-between;align-items:center;margin-top:6px;font-size:11px;color:#999;font-weight:300;}
.Qixian-pyq-iacts{display:flex;gap:16px;}
.Qixian-pyq-btn{display:flex;align-items:center;gap:4px;cursor:pointer;color:#888;transition:color .2s;}
.Qixian-pyq-btn:active{color:#222;}
.Qixian-pyq-btn svg{width:16px;height:16px;fill:none;stroke:currentColor;stroke-width:1.5;}
.Qixian-pyq-ints{background:rgba(0,0,0,.02);border-radius:12px;margin-top:10px;font-size:12px;color:#444;border:.5px solid rgba(0,0,0,.02);}
.Qixian-pyq-likes{padding:8px 12px;display:flex;align-items:center;gap:8px;color:#222;font-weight:500;border:none;}
.Qixian-pyq-likes svg{width:14px;height:14px;fill:currentColor;}
.Qixian-pyq-coms{padding:8px 12px;display:flex;flex-direction:column;gap:6px;border-top:.5px solid rgba(0,0,0,.03);}
.Qixian-pyq-com{cursor:pointer;transition:opacity .2s;font-weight:300;}
.Qixian-pyq-com:active{opacity:.6;}
.Qixian-pyq-com span{font-weight:500;color:#222;}
`;

/* ============ HTML TEMPLATE ============ */
var HTML = '<div class="Qixian-stage"><div class="Qixian-phone-wrap" id="Qx-Phone-Wrapper"><div class="Qixian-phone"><div class="Qixian-home-screen Qixian-jhome"><div class="Qixian-ios-statusbar"><div class="Qixian-jhome-time">12:00</div><div class="Qixian-ios-statusbar-right"><svg viewBox="0 0 24 24"><path d="M12 20h2V10h-2v10zm-4 0h2v-6H8v6zm8-14v14h2V6h-2zM4 20h2v-3H4v3z"/></svg><svg viewBox="0 0 24 24"><path d="M12 3c-4.8 0-9.1 1.9-12.3 5l1.4 1.4C4.1 6.5 7.9 4.8 12 4.8s7.9 1.7 10.9 4.6l1.4-1.4C21.1 4.9 16.8 3 12 3zm0 5.5c-3.2 0-6.2 1.2-8.5 3.3l1.4 1.4c1.9-1.7 4.4-2.7 7.1-2.7s5.2 1 7.1 2.7l1.4-1.4C18.2 9.7 15.2 8.5 12 8.5zm0 5c-1.6 0-3.1.6-4.2 1.6l1.4 1.4c.8-.7 1.8-1 2.8-1s2 .3 2.8 1l1.4-1.4c-1.1-1-2.6-1.6-4.2-1.6zm0 4.5c-.8 0-1.5.7-1.5 1.5S11.2 21 12 21s1.5-.7 1.5-1.5S12.8 18 12 18z"/></svg><div class="Qixian-ios-battery"><div class="Qixian-ios-battery-level"></div></div></div></div><div class="Qixian-sticky-note"><div class="Qixian-sticky-tape"></div><textarea class="Qixian-sticky-textarea Qixian-jsticky-txt" placeholder="在这里写下便签..."></textarea><button class="Qixian-sticky-btn Qixian-jsticky-save">保存更新</button></div><div class="Qixian-dock"><div class="Qixian-dock-icon" id="app-wechat"><svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg></div><div class="Qixian-dock-icon" id="app-phone"><svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg></div></div></div><div class="Qixian-sys-app Qixian-japp-panel"><div class="Qixian-sys-app-hd"><div class="Qixian-japp-back" style="cursor:pointer;"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#222" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg></div><span class="Qixian-japp-title" style="flex:1;text-align:center;padding-right:24px;">电话</span></div><div class="Qixian-sys-app-body Qixian-japp-body"><div class="Qixian-phone-app-container"><div class="Qixian-phone-content" id="phone-content"></div><div class="Qixian-phone-tabbar"><div class="Qixian-ptab active" data-target="recents"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>最近通话</div><div class="Qixian-ptab" data-target="contacts"><svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>联系人</div><div class="Qixian-ptab" data-target="dialpad"><svg viewBox="0 0 24 24"><circle cx="6" cy="6" r="2"></circle><circle cx="12" cy="6" r="2"></circle><circle cx="18" cy="6" r="2"></circle><circle cx="6" cy="12" r="2"></circle><circle cx="12" cy="12" r="2"></circle><circle cx="18" cy="12" r="2"></circle><circle cx="6" cy="18" r="2"></circle><circle cx="12" cy="18" r="2"></circle><circle cx="18" cy="18" r="2"></circle></svg>拨号键盘</div></div></div></div></div><div class="Qixian-content-layer Qixian-root"><div class="Qixian-bg Qixian-jbg"></div><div class="Qixian-call Qixian-jcall state-out"><div class="Qixian-call-mini-hint"></div><div class="Qixian-call-vbg Qixian-bind-lav-bg"></div><div class="Qixian-call-pip Qixian-bind-rav-bg"></div><div class="Qixian-call-mini-top Qixian-jcall-mini-top"><svg viewBox="0 0 24 24"><path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"/></svg></div><div class="Qixian-call-ct"><div class="Qixian-call-avs"><div class="Qixian-call-av Qixian-jcall-lav Qixian-bind-lav"></div><div class="Qixian-call-av Qixian-jcall-rav Qixian-bind-rav"></div></div><div class="Qixian-call-nm Qixian-jcall-nm Qixian-bind-lnm"></div><div class="Qixian-call-timer Qixian-jcall-timer">00:00</div><div class="Qixian-call-st Qixian-jcall-st">正在呼叫...</div><div class="Qixian-call-bubs Qixian-jcall-bubs"></div><div class="Qixian-call-ft"><div class="Qixian-call-btns btns-in"><div class="Qixian-call-btn hangup Qixian-jcall-reject"><svg viewBox="0 0 24 24"><path d="M10.5 4.5l-2-2a2 2 0 0 0-2.83 0l-2 2a2 2 0 0 0 0 2.83l9 9a2 2 0 0 0 2.83 0l2-2a2 2 0 0 0 0-2.83z"/><path d="M14 8h5v5"/><path d="M19 8l-5 5"/></svg></div><div class="Qixian-call-btn answer Qixian-jcall-answer"><svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg></div></div><div class="Qixian-call-btns btns-out"><div class="Qixian-call-btn cancel Qixian-jcall-cancel"><svg viewBox="0 0 24 24"><path d="M10.5 4.5l-2-2a2 2 0 0 0-2.83 0l-2 2a2 2 0 0 0 0 2.83l9 9a2 2 0 0 0 2.83 0l2-2a2 2 0 0 0 0-2.83z"/><path d="M14 8h5v5"/><path d="M19 8l-5 5"/></svg></div></div><div class="Qixian-call-inrow"><div class="Qixian-call-btn hangup mini Qixian-jcall-end" title="挂断"><svg viewBox="0 0 24 24"><path d="M10.5 4.5l-2-2a2 2 0 0 0-2.83 0l-2 2a2 2 0 0 0 0 2.83l9 9a2 2 0 0 0 2.83 0l2-2a2 2 0 0 0 0-2.83z"/><path d="M14 8h5v5"/><path d="M19 8l-5 5"/></svg></div><input type="text" class="Qixian-call-in Qixian-jcall-in" placeholder="发送实时消息..."><button class="Qixian-call-send Qixian-jcall-send">发送</button></div></div></div></div><div class="Qixian-hd Qixian-jhd"><div class="Qixian-notch"></div><div class="Qixian-hd-back Qixian-jhd-back" title="返回主界面"><svg viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"></polyline></svg></div><div class="Qixian-hd-ph" style="display:none;"></div><div class="Qixian-hd-mid"><div class="Qixian-ubox Qixian-jpat-l"><div class="Qixian-uav Qixian-bind-lav" title="点击修改拍一拍"></div><div class="Qixian-uname Qixian-bind-lnm" title="点击修改对方备注"></div></div><div class="Qixian-waves"><span class="Qixian-wave"></span><span class="Qixian-wave"></span><span class="Qixian-wave"></span><span class="Qixian-wave"></span><span class="Qixian-wave"></span><span class="Qixian-wave"></span></div><div class="Qixian-ubox Qixian-jpat-r"><div class="Qixian-uav Qixian-bind-rav" title="点击修改拍一拍"></div><div class="Qixian-uname Qixian-bind-rnm" title="点击修改自己备注"></div></div></div><div class="Qixian-icons-rt"><div class="Qixian-icbtn pyq Qixian-jpyqbtn" title="朋友圈"><svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg></div><div class="Qixian-icbtn Qixian-jset-open" title="设置"><svg viewBox="0 0 24 24"><circle cx="12" cy="5" r="2.5"/><circle cx="12" cy="12" r="2.5"/><circle cx="12" cy="19" r="2.5"/></svg></div></div><div class="Qixian-hd-pull Qixian-jhd-toggle"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg></div></div><div class="Qixian-chat Qixian-jchat"></div><div class="Qixian-pyq-panel Qixian-jpyqpanel"><div class="Qixian-pyq-hd"><div class="Qixian-pyq-back Qixian-jpyqback" title="返回"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="15 18 9 12 15 6"></polyline></svg></div><div class="Qixian-pyq-addbtn Qixian-jpyqadd"><svg viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg></div></div><div class="Qixian-pyq-scroll"><div class="Qixian-pyq-cover Qixian-jpyq-cover" title="点击更换背景"><div class="Qixian-pyq-user"><div class="Qixian-pyq-uname Qixian-bind-rnm"></div><div class="Qixian-pyq-uav Qixian-jpyq-uav" title="点击更换头像"></div></div></div><div class="Qixian-pyq-list Qixian-jpyqlist"></div></div></div><div class="Qixian-txt-zoom Qixian-jtxtzoom"><div class="Qixian-txt-zoom-in Qixian-jtxtzoomin"></div></div><div class="Qixian-set Qixian-jset"><div class="Qixian-set-h">视觉控制台<span class="Qixian-set-x Qixian-jset-close">&times;</span></div><div class="Qixian-set-r"><label>左侧名称</label><div class="Qixian-color-wrap"><input type="text" class="Qixian-hex-in Qixian-jset-lnm" placeholder="输入名称" style="width:100px;"></div></div><div class="Qixian-set-r"><label>右侧名称</label><div class="Qixian-color-wrap"><input type="text" class="Qixian-hex-in Qixian-jset-rnm" placeholder="输入名称" style="width:100px;"></div></div><div class="Qixian-set-r"><label>拉黑拦截控制</label><div class="Qixian-color-wrap"><button class="Qixian-bg-btn Qixian-jblk-l" title="右侧拉黑左侧，左侧发出的消息带叹号">右侧拉黑左侧</button><button class="Qixian-bg-btn Qixian-jblk-r" title="左侧拉黑右侧，右侧发出的消息带叹号">左侧拉黑右侧</button></div></div><div class="Qixian-set-r"><label>主页/聊天背景</label><div class="Qixian-color-wrap"><button class="Qixian-bg-btn Qixian-jbg-upload">上传/更换</button><button class="Qixian-bg-btn Qixian-jbg-clear">恢复默认</button></div></div><div class="Qixian-set-r"><label>头像形状</label><div class="Qixian-color-wrap"><button class="Qixian-bg-btn Qixian-jav-rnd active">圆形</button><button class="Qixian-bg-btn Qixian-jav-sq">方形</button></div></div><div class="Qixian-set-r"><label>质感风格</label><div class="Qixian-color-wrap"><button class="Qixian-bg-btn Qixian-jglass-glass active">毛玻璃</button><button class="Qixian-bg-btn Qixian-jglass-solid">纯实色</button></div></div><div class="Qixian-set-r"><label>手机外壳</label><div class="Qixian-color-wrap"><input type="text" id="Qx-wrap-txt" class="Qixian-hex-in"><input type="color" id="Qx-wrap"></div></div><div class="Qixian-set-r"><label>顶部栏背景</label><div class="Qixian-color-wrap"><input type="text" id="Qx-hdr-txt" class="Qixian-hex-in"><input type="color" id="Qx-hdr"></div></div><div class="Qixian-set-r"><label>顶部下拉键</label><div class="Qixian-color-wrap"><input type="text" id="Qx-pull-txt" class="Qixian-hex-in"><input type="color" id="Qx-pull"></div></div><div class="Qixian-set-r"><label>波浪呼吸条</label><div class="Qixian-color-wrap"><input type="text" id="Qx-wv-txt" class="Qixian-hex-in"><input type="color" id="Qx-wv"></div></div><div class="Qixian-set-r"><label>交互卡片底色</label><div class="Qixian-color-wrap"><input type="text" id="Qx-card-txt" class="Qixian-hex-in"><input type="color" id="Qx-card"></div></div><div class="Qixian-set-r"><label>底部输入区</label><div class="Qixian-color-wrap"><input type="text" id="Qx-ftr-txt" class="Qixian-hex-in"><input type="color" id="Qx-ftr"></div></div><div class="Qixian-set-r"><label>我方气泡</label><div class="Qixian-color-wrap"><input type="text" id="Qx-bub-txt" class="Qixian-hex-in"><input type="color" id="Qx-bub"></div></div><div class="Qixian-set-r"><label>对方气泡</label><div class="Qixian-color-wrap"><input type="text" id="Qx-bubl-txt" class="Qixian-hex-in"><input type="color" id="Qx-bubl"></div></div><div class="Qixian-set-r"><label>气泡文字</label><div class="Qixian-color-wrap"><input type="text" id="Qx-tm-txt" class="Qixian-hex-in"><input type="color" id="Qx-tm"></div></div><div class="Qixian-set-r"><label>交互卡片字</label><div class="Qixian-color-wrap"><input type="text" id="Qx-cdt-txt" class="Qixian-hex-in"><input type="color" id="Qx-cdt"></div></div><div class="Qixian-set-r"><label>交互卡片图标</label><div class="Qixian-color-wrap"><input type="text" id="Qx-cic-txt" class="Qixian-hex-in"><input type="color" id="Qx-cic"></div></div><div class="Qixian-set-r"><label>顶部栏文字</label><div class="Qixian-color-wrap"><input type="text" id="Qx-hdt-txt" class="Qixian-hex-in"><input type="color" id="Qx-hdt"></div></div><div class="Qixian-set-r"><label>顶部栏图标</label><div class="Qixian-color-wrap"><input type="text" id="Qx-hdi-txt" class="Qixian-hex-in"><input type="color" id="Qx-hdi"></div></div><div class="Qixian-set-r"><label>系统提示字</label><div class="Qixian-color-wrap"><input type="text" id="Qx-sys-txt" class="Qixian-hex-in"><input type="color" id="Qx-sys"></div></div><div class="Qixian-set-r"><label>通话左气泡</label><div class="Qixian-color-wrap"><input type="text" id="Qx-cbubl-txt" class="Qixian-hex-in"><input type="color" id="Qx-cbubl"></div></div><div class="Qixian-set-r"><label>通话右气泡</label><div class="Qixian-color-wrap"><input type="text" id="Qx-cbub-txt" class="Qixian-hex-in"><input type="color" id="Qx-cbub"></div></div><div class="Qixian-set-r"><label>通话气泡字</label><div class="Qixian-color-wrap"><input type="text" id="Qx-cbtxt-txt" class="Qixian-hex-in"><input type="color" id="Qx-cbtxt"></div></div></div><div class="Qixian-ft"><div class="Qixian-reply-bar Qixian-jrepbar"><span class="Qixian-reply-txt Qixian-jreptxt"></span><div class="Qixian-reply-close Qixian-jrepclose">×</div></div><div class="Qixian-in-area"><div class="Qixian-lang Qixian-jlang">CN</div><div class="Qixian-plus Qixian-jplus"><svg viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg></div><input type="text" class="Qixian-input Qixian-jinput" placeholder="输入文字发送..."><div class="Qixian-mic Qixian-jmic"><svg viewBox="0 0 24 24"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="22"></line></svg></div><div class="Qixian-send Qixian-jsend"><svg viewBox="0 0 24 24"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg></div></div><div class="Qixian-panel Qixian-jpanel"><div class="Qixian-pi Qixian-jbtn-voice"><div class="Qixian-pic"><svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg></div><div class="Qixian-ptx">语音呼叫</div></div><div class="Qixian-pi Qixian-jbtn-video"><div class="Qixian-pic"><svg viewBox="0 0 24 24"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg></div><div class="Qixian-ptx">视频呼叫</div></div><div class="Qixian-pi Qixian-jimgbtn"><div class="Qixian-pic"><svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg></div><div class="Qixian-ptx">发原图</div></div><div class="Qixian-pi Qixian-jtxtimg"><div class="Qixian-pic"><svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7 8h10M7 12h10M7 16h6"/></svg></div><div class="Qixian-ptx">发文字图</div></div><div class="Qixian-pi Qixian-jgiftbtn"><div class="Qixian-pic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><polyline points="20 12 20 22 4 22 4 12"></polyline><rect x="2" y="7" width="20" height="5"></rect><line x1="12" y1="22" x2="12" y2="7"></line><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"></path><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"></path></svg></div><div class="Qixian-ptx">送礼物</div></div><div class="Qixian-pi Qixian-jlinkbtn"><div class="Qixian-pic"><svg viewBox="0 0 24 24"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></div><div class="Qixian-ptx">发链接</div></div><div class="Qixian-pi Qixian-jtf"><div class="Qixian-pic"><svg viewBox="0 0 24 24" class="fl"><path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/></svg></div><div class="Qixian-ptx">转账</div></div><div class="Qixian-pi Qixian-jemo"><div class="Qixian-pic"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg></div><div class="Qixian-ptx">表情包</div></div><div class="Qixian-pi Qixian-jmusic"><div class="Qixian-pic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6"></path><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path></svg></div><div class="Qixian-ptx">一起听歌</div></div><div class="Qixian-pi Qixian-jcp"><div class="Qixian-pic"><svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg></div><div class="Qixian-ptx">情侣空间</div></div><div class="Qixian-pi Qixian-jbtn-loc"><div class="Qixian-pic"><svg viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg></div><div class="Qixian-ptx">共享位置</div></div><div class="Qixian-pi Qixian-jbtn-food"><div class="Qixian-pic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg></div><div class="Qixian-ptx">点外卖</div></div><div class="Qixian-pi Qixian-jbtn-draw"><div class="Qixian-pic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg></div><div class="Qixian-ptx">手绘便签</div></div></div></div>' +
/* modals */
'<div class="Qixian-mf Qixian-jmsgact"><div class="Qixian-mbox" style="height:auto;padding-bottom:24px;"><div class="Qixian-act-btn Qixian-jact-reply">引用回复</div><div class="Qixian-act-btn Qixian-jact-revoke" style="display:none;color:#222;">撤回消息</div><div class="Qixian-act-space"></div><div class="Qixian-act-btn Qixian-jact-cancel" style="color:#888;">取消</div></div></div>' +
'<div class="Qixian-cen Qixian-jaddfriendmodal w260"><div class="Qixian-cen-box"><h4>重新添加好友</h4><input type="text" class="Qixian-cen-inp Qixian-jaddgreet" placeholder="打个招呼吧..."><div class="Qixian-cen-btns"><button class="cc Qixian-jaddfcancel">取消</button><button class="ok Qixian-jaddfok">发送申请</button></div></div></div>' +
'<div class="Qixian-cen Qixian-jtfactmodal w260"><div class="Qixian-cen-box"><h4>转账处理</h4><div style="font-size:13px;color:#888;text-align:center;font-weight:300;">请选择对该笔转账的操作</div><div class="Qixian-cen-btns"><button class="cc Qixian-jtfact-return">退回</button><button class="ok Qixian-jtfact-receive">收款</button></div><div class="Qixian-cen-btns" style="margin-top:-6px;"><button class="cc Qixian-jtfact-cancel" style="width:100%;">取消</button></div></div></div>' +
'<div class="Qixian-cen Qixian-jlocinputmodal w260"><div class="Qixian-cen-box"><h4>发送位置分享</h4><input type="text" class="Qixian-cen-inp Qixian-jlocin-pos" placeholder="我的位置 (如:朝阳区)"><input type="text" class="Qixian-cen-inp Qixian-jlocin-dist" placeholder="相距距离 (如:12.5 km)"><div class="Qixian-cen-btns"><button class="cc Qixian-jlocincancel">取消</button><button class="ok Qixian-jlocinok">发送</button></div></div></div>' +
'<div class="Qixian-cen Qixian-jdrawmodal w260"><div class="Qixian-cen-box" style="width:290px;padding:20px;"><h4>手绘涂鸦</h4><canvas class="Qixian-draw-canvas Qixian-jdrawcanvas" width="246" height="246"></canvas><div class="Qixian-draw-tools"><input type="color" class="Qixian-draw-color Qixian-jdrawcolor" value="#222222"><input type="range" class="Qixian-draw-range Qixian-jdrawwidth" min="1" max="20" value="3"><div class="Qixian-draw-btn-icon Qixian-jdraweraser" title="橡皮擦"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 20H7L3 16C2.5 15.5 2.5 14.5 3 14L13 4C13.5 3.5 14.5 3.5 15 4L20 9C20.5 9.5 20.5 10.5 20 11L11 20H20V20Z"/></svg></div><div class="Qixian-draw-btn-icon Qixian-jdrawundo" title="撤销"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10h10a5 5 0 0 1 5 5v2"/><polyline points="7 6 3 10 7 14"/></svg></div><div class="Qixian-draw-btn-icon Qixian-jdrawclear" title="清空画布"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg></div></div><div class="Qixian-cen-btns"><button class="cc Qixian-jdrawcancel">取消</button><button class="ok Qixian-jdrawok">发送</button></div></div></div>' +
'<div class="Qixian-cen Qixian-jgiftmodal w260"><div class="Qixian-cen-box"><h4>送专属礼物</h4><input type="text" class="Qixian-cen-inp Qixian-jgiftdesc" placeholder="礼物名称或描述"><div class="Qixian-tf-grp"><span>¥</span><input type="number" class="Qixian-jgiftpr" placeholder="0.00"></div><input type="text" class="Qixian-cen-inp Qixian-jgiftnote" placeholder="备注留言"><div class="Qixian-cen-btns"><button class="cc Qixian-jgiftcancel">取消</button><button class="ok Qixian-jgiftok">送出</button></div></div></div>' +
'<div class="Qixian-cen Qixian-jlinkmodal w260"><div class="Qixian-cen-box"><h4>分享外链</h4><input type="text" class="Qixian-cen-inp Qixian-jlinkurl" placeholder="网址URL..."><input type="text" class="Qixian-cen-inp Qixian-jlinktitle" placeholder="分享标题..."><div class="Qixian-cen-btns"><button class="cc Qixian-jlinkcancel">取消</button><button class="ok Qixian-jlinkok">分享</button></div></div></div>' +
'<div class="Qixian-cen Qixian-jtfmodal"><div class="Qixian-cen-box"><h4>发起转账</h4><div class="Qixian-tf-grp"><span>¥</span><input type="number" class="Qixian-jtfamt" placeholder="0.00"></div><input type="text" class="Qixian-cen-inp Qixian-jtftitle" placeholder="转账说明"><div class="Qixian-cen-btns"><button class="cc Qixian-jtfcancel">取消</button><button class="ok Qixian-jtfok">确认</button></div></div></div>' +
'<div class="Qixian-cen Qixian-jimgmodal w260"><div class="Qixian-cen-box"><h4>发送原图直链</h4><input type="text" class="Qixian-cen-inp Qixian-jimgurl" placeholder="图片URL直链/AI提示词..."><input type="text" class="Qixian-cen-inp Qixian-jimgdesc" placeholder="图片描述"><div class="Qixian-cen-btns"><button class="cc Qixian-jimgcancel">取消</button><button class="ok Qixian-jimgok">发送直链</button></div></div></div>' +
'<div class="Qixian-cen Qixian-jtxtimgmodal w260"><div class="Qixian-cen-box"><h4>文字图气泡</h4><textarea class="Qixian-jtxtimgin" rows="3" placeholder="输入气泡中的文字..."></textarea><div class="Qixian-cen-btns"><button class="cc Qixian-jtxtimgcancel">取消</button><button class="ok Qixian-jtxtimgok">发送</button></div></div></div>' +
'<div class="Qixian-cen Qixian-jfoodmodal w260"><div class="Qixian-cen-box"><h4>高级外卖</h4><input type="text" class="Qixian-cen-inp Qixian-jfoodshop" placeholder="店铺名称 (如: 肯德基)"><input type="text" class="Qixian-cen-inp Qixian-jfooditems" placeholder="外卖内容 (如: 炸鸡套餐)"><input type="text" class="Qixian-cen-inp Qixian-jfoodaddr" placeholder="配送地址"><input type="text" class="Qixian-cen-inp Qixian-jfoodname" placeholder="收件人姓名"><input type="text" class="Qixian-cen-inp Qixian-jfoodphone" placeholder="收件人电话"><div class="Qixian-cen-btns"><button class="cc Qixian-jfoodcancel">取消</button><button class="ok Qixian-jfoodok">下单并发送</button></div></div></div>' +
'<div class="Qixian-cen Qixian-jvoicemodal w260"><div class="Qixian-cen-box"><h4>语音异常/降级</h4><textarea class="Qixian-jvoicetxt" rows="3" placeholder="麦克风受限，请输入文字..."></textarea><div class="Qixian-cen-btns"><button class="cc Qixian-jvoicecancel">取消</button><button class="ok Qixian-jvoiceok">生成语音条</button></div></div></div>' +
'<div class="Qixian-cen Qixian-jpatmodal w260"><div class="Qixian-cen-box"><h4>修改拍一拍后缀</h4><div style="font-size:12px;color:#888;text-align:center;font-weight:300;">双击头像时生效</div><input type="text" class="Qixian-cen-inp Qixian-jpatin" placeholder="例如：的脑袋"><div class="Qixian-cen-btns"><button class="cc Qixian-jpatcancel">取消</button><button class="ok Qixian-jpatok">确定</button></div></div></div>' +
'<div class="Qixian-cen Qixian-jaddemomodal w260"><div class="Qixian-cen-box"><h4>添加自定义表情</h4><input type="text" class="Qixian-cen-inp Qixian-jaddemourl" placeholder="图片URL直链..."><input type="text" class="Qixian-cen-inp Qixian-jaddemotxt" placeholder="说明文字"><div class="Qixian-cen-btns"><button class="cc Qixian-jaddemocancel">取消</button><button class="ok Qixian-jaddemook">保存</button></div></div></div>' +
'<div class="Qixian-cen Qixian-jviewmodal w260"><div class="Qixian-cen-box"><h4>撤回原文</h4><textarea class="Qixian-cen-inp Qixian-jviewtxt" rows="4" readonly style="background:rgba(255,255,255,.8);"></textarea><div class="Qixian-cen-btns"><button class="ok Qixian-jviewclose" style="width:100%;">关闭</button></div></div></div>' +
'<div class="Qixian-cen Qixian-jpyqsendmodal w260"><div class="Qixian-cen-box"><h4>发朋友圈</h4><textarea class="Qixian-cen-inp Qixian-jpyqsendtxt" rows="3" placeholder="这一刻的想法..."></textarea><input type="text" class="Qixian-cen-inp Qixian-jpyqsendimg" placeholder="配图URL直链 (可选)"><textarea class="Qixian-cen-inp Qixian-jpyqsendtxtimg" rows="2" placeholder="或者直接发文字图，输入内容..."></textarea><div class="Qixian-cen-btns"><button class="cc Qixian-jpyqsendcancel">取消</button><button class="ok Qixian-jpyqsendok">发表</button></div></div></div>' +
'<div class="Qixian-cen Qixian-jpyqcommodal w260"><div class="Qixian-cen-box"><h4>评论动态</h4><textarea class="Qixian-cen-inp Qixian-jpyqcomtxt" rows="3" placeholder="说点什么..."></textarea><div class="Qixian-cen-btns"><button class="cc Qixian-jpyqcomcancel">取消</button><button class="ok Qixian-jpyqcomok">评论</button></div></div></div>' +
'<div class="Qixian-mf Qixian-jlocmodal"><div class="Qixian-mbox"><div class="Qixian-mh"><span>位置共享</span><div class="Qixian-mc Qixian-jlocclose">&times;</div></div><div class="Qixian-loc-wrap"><div class="Qixian-cp-top" style="z-index:10;"><div class="Qixian-cp-avs"><div class="Qixian-cp-face Qixian-bind-lav"></div><div class="Qixian-cp-face Qixian-jcpf2 Qixian-bind-rav"></div></div><div class="Qixian-loc-dist">相距 <span id="Qx-loc-dist">未知</span></div></div><div class="Qixian-radar"><div class="Qixian-radar-wave"></div><div class="Qixian-radar-wave w2"></div><div class="Qixian-anchor a1"><div class="Qixian-anchor-av Qixian-bind-lav"></div><div class="Qixian-anchor-tip t1">未获取位置</div></div><div class="Qixian-anchor a2"><div class="Qixian-anchor-av Qixian-bind-rav"></div><div class="Qixian-anchor-tip t2">未获取位置</div></div></div><button class="Qixian-loc-send Qixian-jlocsend">发送当前定位</button></div></div></div>' +
'<div class="Qixian-mf Qixian-jemomodal"><div class="Qixian-mbox"><div class="Qixian-mh"><span>选择表情与互动</span><div class="Qixian-mc Qixian-jemoclose">&times;</div></div><div class="Qixian-emo-games"><div class="Qixian-emo-gamebtn jemo-poke"><svg viewBox="0 0 24 24"><path d="M11 2a2 2 0 0 0-2 2v5H6a2 2 0 0 0-2 2v2c0 4.4 3.6 8 8 8h3a5 5 0 0 0 5-5v-6a2 2 0 0 0-2-2h-3V4a2 2 0 0 0-2-2z"/></svg>戳一戳</div><div class="Qixian-emo-gamebtn jemo-dice"><svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><circle cx="15.5" cy="15.5" r="1.5"/><circle cx="15.5" cy="8.5" r="1.5"/><circle cx="8.5" cy="15.5" r="1.5"/><circle cx="12" cy="12" r="1.5"/></svg>摇骰子</div><div class="Qixian-emo-gamebtn jemo-rps"><svg viewBox="0 0 24 24"><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><line x1="20" y1="4" x2="8.12" y2="15.88"/><line x1="14.47" y1="14.48" x2="20" y2="20"/><line x1="8.12" y1="8.12" x2="12" y2="12"/></svg>猜拳</div><div class="Qixian-emo-addbtn Qixian-jaddemobtn" title="添加表情"><svg viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg></div></div><div class="Qixian-emo Qixian-jemolist"></div></div></div>' +
'<div class="Qixian-mf Qixian-jmumodal"><div class="Qixian-mbox"><div class="Qixian-mh"><span>一起听歌</span><div class="Qixian-mc Qixian-jmuclose">&times;</div></div><div class="Qixian-mu"><div class="Qixian-mu-stage"><div class="Qixian-mu-face Qixian-jmuf1 Qixian-bind-lav"></div><div class="Qixian-mu-waves Qixian-jmuwaves"><span class="Qixian-wave"></span><span class="Qixian-wave"></span><span class="Qixian-wave"></span></div><div class="Qixian-mu-face Qixian-jmuf2 Qixian-bind-rav"></div></div><div class="Qixian-mu-time-disp">累计听歌: <span id="Qx-mutime-val">0</span> 分钟</div><div class="Qixian-mu-now Qixian-jmunow" style="text-align:center;font-size:13px;color:#555;font-weight:400;">未在播放</div><div class="Qixian-mu-ctrl"><div class="Qixian-mu-btn Qixian-jmuprev"><svg viewBox="0 0 24 24"><polygon points="19 20 9 12 19 4 19 20" fill="none" stroke="#222" stroke-width="1.5"/><line x1="5" y1="19" x2="5" y2="5" stroke="#222" stroke-width="1.5"/></svg></div><div class="Qixian-mu-btn main Qixian-jmuplay"><svg class="Qixian-jmuicon" viewBox="0 0 24 24"><polygon points="7 4 19 12 7 20 7 4" fill="#222"/></svg></div><div class="Qixian-mu-btn Qixian-jmunext"><svg viewBox="0 0 24 24"><polygon points="5 4 15 12 5 20 5 4" fill="none" stroke="#222" stroke-width="1.5"/><line x1="19" y1="5" x2="19" y2="19" stroke="#222" stroke-width="1.5"/></svg></div></div><div class="Qixian-mu-inp-wrap"><input type="text" class="Qixian-mu-name Qixian-jmuname" placeholder="歌曲名称"><input type="text" class="Qixian-mu-artist Qixian-jmuartist" placeholder="歌手名"></div><div class="Qixian-mu-inp-wrap" style="margin-top:-8px;"><input type="text" class="Qixian-mu-cover Qixian-jmucover" placeholder="专辑封面URL直链 (可选)"></div><div class="Qixian-mu-inp-wrap" style="margin-top:-8px;"><input type="text" class="Qixian-mu-inp Qixian-jmuinp" placeholder="单曲直链或网易云ID"><button class="Qixian-mu-add Qixian-jmuaddbtn">添加</button></div><div class="Qixian-mu-list Qixian-jmulist"></div><button class="Qixian-mu-invbtn Qixian-jmuinv">发送一起听歌邀请</button></div></div></div>' +
'<div class="Qixian-mf Qixian-jcpmodal"><div class="Qixian-mbox"><div class="Qixian-mh"><span>情侣空间</span><div class="Qixian-mc Qixian-jcpclose">&times;</div></div><div class="Qixian-cp"><div class="Qixian-cp-top"><div class="Qixian-cp-avs"><div class="Qixian-cp-face Qixian-bind-lav"></div><div class="Qixian-cp-face Qixian-jcpf2 Qixian-bind-rav"></div></div><div class="Qixian-cp-id-group"><span class="Qixian-bind-lnm"></span> & <span class="Qixian-bind-rnm"></span></div></div><div class="Qixian-cp-rel Qixian-jcprel"></div><div class="Qixian-cp-sec"><div class="Qixian-cp-h"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#222" stroke-width="1.5"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg> 个性签名</div><div class="Qixian-sign-mod"><div class="Qixian-sign-hd"><div class="Qixian-cp-face Qixian-bind-lav" style="width:30px;height:30px;border-width:.5px;"></div><div class="Qixian-cp-id-group Qixian-bind-lnm" style="font-size:12px;"></div></div><div class="Qixian-sign-bd Qixian-jcsign"></div></div><div class="Qixian-sign-mod" style="margin-top:12px;background:rgba(255,255,255,.9);border:.5px solid rgba(0,0,0,.03);"><div class="Qixian-sign-hd"><div class="Qixian-cp-face Qixian-bind-rav" style="width:30px;height:30px;margin-left:0;border-width:.5px;"></div><div class="Qixian-cp-id-group Qixian-bind-rnm" style="font-size:12px;"></div><div class="Qixian-signdel Qixian-jsigndel" title="删除个签"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg></div></div><div class="Qixian-sign-bd Qixian-jusign-disp"></div><div class="Qixian-sign-act"><input type="text" class="Qixian-jusignin" placeholder="输入新签名..."><button class="Qixian-jusignsave">发布更新</button></div></div></div><div class="Qixian-cp-sec"><div class="Qixian-cp-h"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#222" stroke-width="1.5"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> 想做的小事</div><div class="Qixian-cp-things Qixian-jcpthings"></div><div class="Qixian-cp-addrow"><select class="Qixian-jcpwho"><option value="Me">我</option><option value="You">对方</option></select><input type="text" class="Qixian-jcpthingin" placeholder="添加待办..."><button class="Qixian-jcpthingadd">加</button></div></div><div class="Qixian-cp-sec"><div class="Qixian-cp-h"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#222" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg> 纪念日</div><div class="Qixian-cp-days Qixian-jcpdays"></div><div class="Qixian-cp-addrow"><input type="text" class="Qixian-jcpdayname" placeholder="事件名称"><input type="date" class="Qixian-jcpdaydate"><button class="Qixian-jcpdayadd">加</button></div></div><div class="Qixian-cp-sec"><div class="Qixian-cp-h"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#222" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg> 相册与图文</div><div class="Qixian-cp-albums Qixian-jcpalbums"></div><div class="Qixian-cp-addrow"><input type="text" class="Qixian-jcpalbumtxt" placeholder="这一刻的想法..." style="min-width:30px;"><input type="text" class="Qixian-jcpalbumimg" placeholder="图片URL直链(可选)" style="min-width:50px;"><button class="Qixian-jcpalbumadd">上传</button></div></div></div></div></div></div></div></div>';

/* ============ TAVERN ADAPTER ============ */
function getTavernChar(){
    try{
        if(window.character && window.character.name) return window.character;
        var ch = document.querySelector('#avatar, .char-avatar img, .avatar img');
        if(ch){
            var name = ch.alt || ch.getAttribute('title') || '';
            var av = ch.src || '';
            return {name:name, avatar:av};
        }
    }catch(e){}
    return {name:'角色', avatar:''};
}
function getTavernUser(){
    try{
        if(window.user_name) return {name:window.user_name, avatar:window.user_avatar||''};
        var ua = document.querySelector('#user_avatar, .user-avatar img, .user-icon img');
        var un = document.querySelector('.user-name, #user_name');
        return {name: un?un.textContent:'我', avatar: ua?ua.src:''};
    }catch(e){return {name:'我', avatar:''};}
}

/* ============ BUILD DOM ============ */
function buildExtension(){
    if(document.getElementById(FLOAT_ID)) return;
    // inject css
    if(!document.getElementById(CSS_ID)){
        var st=document.createElement('style');
        st.id=CSS_ID;
        st.textContent=CSS;
        document.head.appendChild(st);
    }
    // float container
    var floatEl=document.createElement('div');
    floatEl.id=FLOAT_ID;
    // toggle button
    var btn=document.createElement('div');
    btn.id=TOGGLE_ID;
    btn.title='Qixian 手机';
    btn.innerHTML='<svg viewBox="0 0 24 24"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>';
    // panel
    var panel=document.createElement('div');
    panel.id=PANEL_ID;
    panel.innerHTML=HTML;
    floatEl.appendChild(panel);
    floatEl.appendChild(btn);
    document.body.appendChild(floatEl);
    // toggle
    btn.addEventListener('click',function(){
        panel.classList.toggle('show');
    });
    return {floatEl:floatEl, panel:panel, btn:btn};
}

/* ============ CORE LOGIC (adapted from original) ============ */
function initPhone(scope, charInfo, userInfo){
    var Q=function(s){return scope.querySelector(s);};
    var QA=function(s){return scope.querySelectorAll(s);};

    var rawLAv=charInfo.avatar||'', rawLName=charInfo.name||'角色';
    var rawRAv=userInfo.avatar||'', rawRName=userInfo.name||'我';

    var QxStore={
        get:function(k){try{return localStorage.getItem(k);}catch(e){return null;}},
        set:function(k,v){try{localStorage.setItem(k,v);}catch(e){}}
    };

    function resolveAvatar(rawUrl,isChar){
        if(rawUrl&&rawUrl.startsWith('http')) return rawUrl;
        try{
            if(isChar){
                var cImg=document.querySelector('#avatar,.char-avatar img,.avatar img');
                if(cImg&&cImg.src) return cImg.src;
            }else{
                var uImg=document.querySelector('#user_avatar,.user-avatar img');
                if(uImg&&uImg.src) return uImg.src;
            }
        }catch(e){}
        return rawUrl;
    }

    var finalLName=rawLName||'Unknown';
    var finalRName=rawRName||'Unknown';
    var finalLAv=resolveAvatar(rawLAv,true)||'';
    var finalRAv=resolveAvatar(rawRAv,false)||'';
    var safeLAv=finalLAv?finalLAv.replace(/"/g,'&quot;').replace(/'/g,'%27'):'';
    var safeRAv=finalRAv?finalRAv.replace(/"/g,'&quot;').replace(/'/g,'%27'):'';

    QA('.Qixian-bind-lav').forEach(function(el){if(safeLAv)el.style.backgroundImage="url('"+safeLAv+"')";});
    QA('.Qixian-bind-rav').forEach(function(el){if(safeRAv)el.style.backgroundImage="url('"+safeRAv+"')";});
    QA('.Qixian-bind-lav-bg').forEach(function(el){if(safeLAv)el.style.backgroundImage="url('"+safeLAv+"')";});
    QA('.Qixian-bind-rav-bg').forEach(function(el){if(safeRAv)el.style.backgroundImage="url('"+safeRAv+"')";});
    QA('.Qixian-bind-lnm').forEach(function(el){el.textContent=finalLName;});
    QA('.Qixian-bind-rnm').forEach(function(el){el.textContent=finalRName;});

    var finalCPat='的肩膀', finalUPat='的脑袋';
    var pendingReply='';
    var actx=null;
    function getCtx(){if(!actx){try{actx=new (window.AudioContext||window.webkitAudioContext)();}catch(e){}}return actx;}
    function playSwoosh(){
        var c=getCtx();if(!c)return;
        try{if(c.state==='suspended')c.resume();var o=c.createOscillator(),g=c.createGain();o.type='sine';o.frequency.setValueAtTime(600,c.currentTime);o.frequency.exponentialRampToValueAtTime(1200,c.currentTime+0.1);g.gain.setValueAtTime(0,c.currentTime);g.gain.linearRampToValueAtTime(0.2,c.currentTime+0.05);g.gain.linearRampToValueAtTime(0,c.currentTime+0.1);o.connect(g);g.connect(c.destination);o.start();o.stop(c.currentTime+0.1);}catch(e){}
    }
    var customRingUrl='https://img.tofaka.com/autoupload/fr/FEa8MSJpCzGxfJi7iutvFIt1IPL8766yrPDdOXw-v_Gyl5f0KlZfm6UsKj-HyTuv/20260710/p0sY/fbeb6ae52fc3e760622f341158564a53.mp3';
    var callRingMp3=null;
    try{callRingMp3=new Audio(customRingUrl);callRingMp3.loop=true;}catch(e){}
    function playRing(){if(callRingMp3){callRingMp3.play().catch(function(e){});}}
    function stopRing(){if(callRingMp3){callRingMp3.pause();callRingMp3.currentTime=0;}}

    function appendCmd(cmd){
        var inputEl=document.querySelector('#send_textarea')||document.querySelector('.commentInput')||document.querySelector('textarea');
        if(!inputEl)return;
        try{
            var setter=Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype,'value').set;
            var cur=inputEl.value||'';var nv=cur?(cur+'\n'+cmd):cmd;
            if(setter){setter.call(inputEl,nv);}else{inputEl.value=nv;}
            inputEl.dispatchEvent(new Event('input',{bubbles:true}));
        }catch(e){inputEl.value=(inputEl.value||'')+'\n'+cmd;}
    }
    function getRealImgUrl(url){if(url&&url.startsWith('local-draw-')){return QxStore.get('Qx-'+url)||url;}return url;}

    var homeScreen=Q('.Qixian-jhome');
    var appPanel=Q('.Qixian-japp-panel');
    var phoneContent=Q('#phone-content');
    var phoneContacts=[{id:'1',name:finalLName,phone:'13800138000'},{id:'2',name:finalRName+' (我)',phone:'13900139000'}];
    var phoneHistory=[];

    setInterval(function(){var d=new Date();var t=Q('.Qixian-jhome-time');if(t)t.textContent=String(d.getHours()).padStart(2,'0')+':'+String(d.getMinutes()).padStart(2,'0');},1000);

    var stickyTxt=Q('.Qixian-jsticky-txt'),stickyBtn=Q('.Qixian-jsticky-save');
    if(stickyTxt&&stickyBtn){
        var savedSticky=QxStore.get('Qx-sticky-note');
        if(savedSticky)stickyTxt.value=savedSticky;
        stickyBtn.addEventListener('click',function(){var val=stickyTxt.value;QxStore.set('Qx-sticky-note',val);playSwoosh();appendCmd('$[更新便签:'+val+']');renderSysMsg('主界面便签已更新并同步');stickyTxt.blur();});
    }

    Q('.Qixian-jhd-back').addEventListener('click',function(){homeScreen.classList.add('active');});
    Q('#app-wechat').addEventListener('click',function(){homeScreen.classList.remove('active');});
    Q('.Qixian-japp-back').addEventListener('click',function(){appPanel.classList.remove('show');});
    Q('#app-phone').addEventListener('click',function(){appPanel.classList.add('show');renderPhoneTab('recents');});
    QA('.Qixian-ptab').forEach(function(tab){tab.addEventListener('click',function(){QA('.Qixian-ptab').forEach(function(t){t.classList.remove('active');});this.classList.add('active');renderPhoneTab(this.getAttribute('data-target'));});});

    function renderPhoneTab(tabType){
        phoneContent.innerHTML='';
        if(tabType==='recents'){
            if(phoneHistory.length===0){phoneContent.innerHTML='<div style="text-align:center;padding-top:100px;color:#aaa;font-size:14px;">暂无通话记录</div>';}
            else{var html='';phoneHistory.forEach(function(h){html+='<div class="Qixian-list-item"><div><div class="Qixian-item-title" style="color:'+(h.type==='out'?'#222':'#555')+';">'+h.name+'</div><div class="Qixian-item-sub">手机 - '+h.time+'</div></div><div class="Qixian-item-arrow"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg></div></div>';});phoneContent.innerHTML=html;}
        }else if(tabType==='contacts'){
            var cHtml='';phoneContacts.forEach(function(c,i){cHtml+='<div class="Qixian-list-item j-contact" data-idx="'+i+'"><div class="Qixian-item-title">'+c.name+'</div></div>';});phoneContent.innerHTML=cHtml;
            QA('.j-contact').forEach(function(el){el.addEventListener('click',function(){var idx=parseInt(this.getAttribute('data-idx'));renderContactDetail(phoneContacts[idx],idx);});});
        }else if(tabType==='dialpad'){
            var dHtml='<div style="text-align:center;font-size:32px;font-weight:300;margin:30px 0 20px;height:40px;letter-spacing:2px;color:#222;" id="dial-disp"></div><div class="Qixian-dial-grid">';
            var keys=['1','2','3','4','5','6','7','8','9','*','0','#'];keys.forEach(function(k){dHtml+='<div class="Qixian-dial-key">'+k+'</div>';});
            dHtml+='</div><div class="Qixian-dial-callbtn"><svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg></div>';
            phoneContent.innerHTML=dHtml;var ddisp=Q('#dial-disp');
            QA('.Qixian-dial-key').forEach(function(el){el.addEventListener('click',function(){ddisp.textContent+=this.textContent;playSwoosh();});});
            Q('.Qixian-dial-callbtn').addEventListener('click',function(){var num=ddisp.textContent;if(!num)return;var matchContact=phoneContacts.find(function(c){return c.phone===num;});triggerCall(matchContact?matchContact.name:num,num);});
        }
    }
    function renderContactDetail(contact,idx){
        var avLtr=contact.name.charAt(0).toUpperCase();
        var html='<div class="Qixian-contact-detail"><div class="Qixian-c-av-wrap"><div class="Qixian-c-av">'+avLtr+'</div></div><div class="Qixian-c-input-grp"><label>姓名</label><input type="text" class="Qixian-c-input" id="c-edit-name" value="'+contact.name+'"></div><div class="Qixian-c-input-grp"><label>手机号</label><input type="text" class="Qixian-c-input" id="c-edit-phone" value="'+contact.phone+'"></div><div class="Qixian-c-btns"><button class="Qixian-c-btn save j-c-save">保存</button><button class="Qixian-c-btn call j-c-call">呼叫</button></div></div>';
        phoneContent.innerHTML=html;
        Q('.j-c-save').addEventListener('click',function(){var nn=Q('#c-edit-name').value.trim();var np=Q('#c-edit-phone').value.trim();if(nn&&np){phoneContacts[idx].name=nn;phoneContacts[idx].phone=np;playSwoosh();renderPhoneTab('contacts');}});
        Q('.j-c-call').addEventListener('click',function(){triggerCall(contact.name,contact.phone);});
    }
    function triggerCall(name,num){
        phoneHistory.unshift({name:name,phone:num,time:nowTime(),type:'out'});
        appPanel.classList.remove('show');homeScreen.classList.remove('active');
        openCallUI('voice','out');appendCmd(isBlkRight?'$[呼叫失败，拒收]':'$[呼叫:语音通话]');
    }

    Q('.Qixian-jhd-toggle').addEventListener('click',function(){Q('.Qixian-jhd').classList.toggle('collapsed');Q('.Qixian-jchat').classList.toggle('collapsed');});
    Q('.Qixian-jset-open').addEventListener('click',function(){Q('.Qixian-jset').classList.add('show');});
    Q('.Qixian-jset-close').addEventListener('click',function(){Q('.Qixian-jset').classList.remove('show');});

    var root=Q('.Qixian-root');
    var mainStage=Q('.Qixian-stage');
    var colorMap=[{id:'Qx-wrap',v:'--wrap-bg'},{id:'Qx-hdr',v:'--hdr-bg'},{id:'Qx-pull',v:'--pull-bg'},{id:'Qx-wv',v:'--wv-bg'},{id:'Qx-card',v:'--card-bg'},{id:'Qx-ftr',v:'--ftr-bg'},{id:'Qx-bub',v:'--bub-r'},{id:'Qx-bubl',v:'--bub-l'},{id:'Qx-tm',v:'--txt-main'},{id:'Qx-cdt',v:'--card-txt'},{id:'Qx-cic',v:'--card-ic'},{id:'Qx-hdt',v:'--hdr-txt'},{id:'Qx-hdi',v:'--hdr-ic'},{id:'Qx-sys',v:'--sys-txt'},{id:'Qx-cbubl',v:'--call-bub-l'},{id:'Qx-cbub',v:'--call-bub-r'},{id:'Qx-cbtxt',v:'--call-bub-txt'}];
    colorMap.forEach(function(c){
        try{
            if(!mainStage)return;
            var picker=mainStage.querySelector('[id="'+c.id+'"]');
            var txtInp=mainStage.querySelector('[id="'+c.id+'-txt"]');
            if(picker&&txtInp){
                var savedColor=QxStore.get(c.id);
                if(savedColor){mainStage.style.setProperty(c.v,savedColor,'important');picker.value=(savedColor.length===7)?savedColor:'#ffffff';txtInp.value=savedColor;}
                picker.addEventListener('input',function(){var newColor=this.value;mainStage.style.setProperty(c.v,newColor,'important');txtInp.value=newColor;QxStore.set(c.id,newColor);});
                picker.addEventListener('change',function(){var newColor=this.value;mainStage.style.setProperty(c.v,newColor,'important');QxStore.set(c.id,newColor);});
                txtInp.addEventListener('input',function(){var newColor=this.value.trim();if(/^#[0-9A-Fa-f]{6}$/.test(newColor)){mainStage.style.setProperty(c.v,newColor,'important');picker.value=newColor;}});
                txtInp.addEventListener('change',function(){var newColor=this.value.trim();if(/^#[0-9A-Fa-f]{6}$/.test(newColor)){mainStage.style.setProperty(c.v,newColor,'important');picker.value=newColor;QxStore.set(c.id,newColor);}else{this.value=QxStore.get(c.id)||'#ffffff';}});
            }
        }catch(e){}
    });

    var btnRnd=Q('.Qixian-jav-rnd'),btnSq=Q('.Qixian-jav-sq');
    if(QxStore.get('Qx-av-shape')==='sq'){root.classList.add('av-sq');if(btnRnd)btnRnd.classList.remove('active');if(btnSq)btnSq.classList.add('active');}
    if(btnRnd&&btnSq){btnRnd.addEventListener('click',function(){root.classList.remove('av-sq');btnRnd.classList.add('active');btnSq.classList.remove('active');QxStore.set('Qx-av-shape','rnd');});btnSq.addEventListener('click',function(){root.classList.add('av-sq');btnSq.classList.add('active');btnRnd.classList.remove('active');QxStore.set('Qx-av-shape','sq');});}

    var btnGlass=Q('.Qixian-jglass-glass'),btnSolid=Q('.Qixian-jglass-solid');
    if(QxStore.get('Qx-glass-mode')==='solid'){root.classList.add('solid-mode');if(btnGlass)btnGlass.classList.remove('active');if(btnSolid)btnSolid.classList.add('active');}
    if(btnGlass&&btnSolid){btnGlass.addEventListener('click',function(){root.classList.remove('solid-mode');btnGlass.classList.add('active');btnSolid.classList.remove('active');QxStore.set('Qx-glass-mode','glass');});btnSolid.addEventListener('click',function(){root.classList.add('solid-mode');btnSolid.classList.add('active');btnGlass.classList.remove('active');QxStore.set('Qx-glass-mode','solid');});}

    var bgUpload=Q('.Qixian-jbg-upload'),bgClear=Q('.Qixian-jbg-clear');
    if(bgUpload){bgUpload.addEventListener('click',function(){var fileInp=document.createElement('input');fileInp.type='file';fileInp.accept='image/*';fileInp.onchange=function(e){var f=e.target.files[0];if(!f)return;var reader=new FileReader();reader.onload=function(re){var b64=re.target.result;QxStore.set('Qx-bg-img',b64);var sfB64=b64.replace(/"/g,'&quot;').replace(/'/g,'%27');QA('.Qixian-jbg,.Qixian-jhome').forEach(function(el){el.style.backgroundImage='url(\''+sfB64+'\')';});if(!Q('.Qixian-jcall').classList.contains('video')){QA('.Qixian-call-vbg').forEach(function(el){el.style.backgroundImage='url(\''+sfB64+'\')';});};};reader.readAsDataURL(f);};fileInp.click();});}
    if(bgClear){bgClear.addEventListener('click',function(){QxStore.set('Qx-bg-img','none');QA('.Qixian-jbg,.Qixian-jhome').forEach(function(el){el.style.backgroundImage='none';});if(!Q('.Qixian-jcall').classList.contains('video')){QA('.Qixian-call-vbg').forEach(function(el){el.style.backgroundImage='none';});};});}

    var setLnm=Q('.Qixian-jset-lnm'),setRnm=Q('.Qixian-jset-rnm');
    if(setLnm){setLnm.value=finalLName;setLnm.addEventListener('input',function(){finalLName=this.value||'Unknown';QA('.Qixian-bind-lnm').forEach(function(el){el.textContent=finalLName;});});}
    if(setRnm){setRnm.value=finalRName;setRnm.addEventListener('input',function(){finalRName=this.value||'Unknown';QA('.Qixian-bind-rnm').forEach(function(el){el.textContent=finalRName;});});}

    var isBlkRight=false,isBlkLeft=false;
    Q('.Qixian-jblk-l').addEventListener('click',function(){isBlkLeft=!isBlkLeft;this.classList.toggle('active',isBlkLeft);renderSysMsg(isBlkLeft?'已被 '+finalLName+' 拉入黑名单':'已将 '+finalRName+' 移出黑名单');});
    Q('.Qixian-jblk-r').addEventListener('click',function(){isBlkRight=!isBlkRight;this.classList.toggle('active',isBlkRight);renderSysMsg(isBlkRight?'已将 '+finalLName+' 加入黑名单':'已将 '+finalLName+' 移出黑名单');});

    Q('.Qixian-jaddfcancel').addEventListener('click',function(){Q('.Qixian-jaddfriendmodal').classList.remove('show');});
    Q('.Qixian-jaddfok').addEventListener('click',function(){var greet=Q('.Qixian-jaddgreet').value.trim()||'你好，我想重新添加你为好友。';playSwoosh();renderSysMsg('已发送好友请求验证');appendCmd('$[发送好友请求:'+greet+']');Q('.Qixian-jaddfriendmodal').classList.remove('show');Q('.Qixian-jaddgreet').value='';});

    QA('.Qixian-uname').forEach(function(el){
        el.setAttribute('contenteditable','true');
        el.addEventListener('keydown',function(e){if(e.key==='Enter'){e.preventDefault();this.blur();}});
        el.addEventListener('blur',function(){var isL=this.closest('.Qixian-jpat-l');var nV=this.textContent.trim();if(isL&&nV&&nV!==finalLName){finalLName=nV;appendCmd('$['+finalRName+' 修改了 '+finalLName+' 的备注:'+nV+']');renderSysMsg(finalRName+' 将 '+finalLName+' 备注修改为 "'+nV+'"');}else if(!isL&&nV&&nV!==finalRName){finalRName=nV;appendCmd('$['+finalRName+' 修改了自己的名字:'+nV+']');renderSysMsg(finalRName+' 将自己的名字修改为 "'+nV+'"');}});
    });

    var langBtn=Q('.Qixian-jlang');var langMap=[{l:'zh-CN',t:'CN'},{l:'en-US',t:'US'}];var langIdx=0;langBtn.addEventListener('click',function(){langIdx=(langIdx+1)%langMap.length;langBtn.textContent=langMap[langIdx].t;});

    var chatBox=Q('.Qixian-jchat');var callBubsBox=Q('.Qixian-jcall-bubs');
    function nowTime(){var d=new Date();return String(d.getHours()).padStart(2,'0')+':'+String(d.getMinutes()).padStart(2,'0');}
    function renderSysMsg(text){var m=document.createElement('div');m.className='Qixian-sys-msg';m.innerHTML=text;chatBox.appendChild(m);setTimeout(function(){chatBox.scrollTop=chatBox.scrollHeight;},60);}
    function renderRight(inner,isRaw,hasErr){
        var row=document.createElement('div');row.className='Qixian-row right'+(hasErr?' has-err':'');
        var body=isRaw?inner:'<div class="Qixian-bub">'+inner+'</div>';
        var avStyle=safeRAv?' style="background-image:url(\''+safeRAv+'\')"':'';
        row.innerHTML='<div class="Qixian-rav Qixian-bind-rav"'+avStyle+'></div><div class="Qixian-ct">'+body+'<div class="Qixian-meta">'+nowTime()+' <span class="Qixian-tick">✓✓</span></div></div><div class="Qixian-err-icon Qixian-jerr" title="消息被拒收">!</div>';
        chatBox.appendChild(row);setTimeout(function(){chatBox.scrollTop=chatBox.scrollHeight;},60);
        if(hasErr){setTimeout(function(){renderSysMsg('对方开启了朋友验证，你还不是他（她）朋友。请先发送朋友验证请求，对方验证通过后，才能聊天。<span class="Qixian-view-rev">发送朋友验证</span>');},150);}
    }

    var curPatTarget='left';
    Q('.Qixian-jpat-l').addEventListener('click',function(e){if(e.target.classList.contains('Qixian-uav')){curPatTarget='left';Q('.Qixian-jpatin').value=finalCPat;Q('.Qixian-jpatmodal').classList.add('show');}});
    Q('.Qixian-jpat-r').addEventListener('click',function(e){if(e.target.classList.contains('Qixian-uav')){curPatTarget='right';Q('.Qixian-jpatin').value=finalUPat;Q('.Qixian-jpatmodal').classList.add('show');}});
    Q('.Qixian-jpatcancel').addEventListener('click',function(){Q('.Qixian-jpatmodal').classList.remove('show');});
    Q('.Qixian-jpatok').addEventListener('click',function(){var p=Q('.Qixian-jpatin').value.trim()||'的肩膀';if(curPatTarget==='left'){finalCPat=p;appendCmd('$['+finalLName+' 的拍一拍后缀设为:'+p+']');}else{finalUPat=p;appendCmd('$['+finalRName+' 的拍一拍后缀设为:'+p+']');}Q('.Qixian-jpatmodal').classList.remove('show');});

    function playAudioNode(bub){if(bub.classList.contains('playing'))return;bub.classList.add('playing');bub.classList.add('open');setTimeout(function(){bub.classList.remove('playing');},2000);}
    function showReplyBar(txt){pendingReply=txt;Q('.Qixian-jreptxt').textContent=txt;Q('.Qixian-jrepbar').classList.add('show');}
    Q('.Qixian-jrepclose').addEventListener('click',function(){pendingReply='';Q('.Qixian-jrepbar').classList.remove('show');});

    var zoom=Q('.Qixian-jtxtzoom'),zoomIn=Q('.Qixian-jtxtzoomin');
    var lastClickTime=0,lastClickTarget=null,targetRevokeRow=null,targetRevokeText='',targetBubNode=null;window.targetTfNode=null;

    chatBox.addEventListener('click',function(e){
        var isErr=e.target.closest('.Qixian-jerr');
        if(isErr){e.stopPropagation();Q('.Qixian-jaddfriendmodal').classList.add('show');return;}
        var pureTf=e.target.closest('.Qixian-j-pure-tf');
        if(pureTf&&!pureTf.classList.contains('got')&&!pureTf.classList.contains('returned')){window.targetTfNode=pureTf;Q('.Qixian-jtfactmodal').classList.add('show');return;}
        var isLav=e.target.closest('.Qixian-lav')||e.target.closest('.Qixian-bind-lav');
        var isRav=e.target.closest('.Qixian-rav')||e.target.closest('.Qixian-bind-rav');
        var isViewRev=e.target.closest('.Qixian-view-rev');
        var auTxtNode=e.target.closest('.Qixian-au-txt');if(auTxtNode){e.stopPropagation();return;}
        var txt=e.target.closest('.Qixian-txt-img');var gift=e.target.closest('.Qixian-gift-card,.Qixian-food-card');var cp=e.target.closest('.Qixian-cp-qacard');var mu=e.target.closest('.Qixian-mu-invite-card,.Qixian-music-share-card');var loc=e.target.closest('.Qixian-loc-card');var auBub=e.target.closest('.Qixian-au');var bub=e.target.closest('.Qixian-bub,.Qixian-img,.Qixian-au,.Qixian-tf,.Qixian-link-card,.Qixian-loc-card,.Qixian-food-card,.Qixian-interact-item');var now=Date.now();
        if(isViewRev){e.stopPropagation();Q('.Qixian-jviewtxt').value=isViewRev.getAttribute('data-txt')||'';Q('.Qixian-jviewmodal').classList.add('show');return;}
        if(auBub){if(lastClickTarget===auBub&&(now-lastClickTime<300)){targetRevokeRow=auBub.closest('.Qixian-row');targetRevokeText=auBub.getAttribute('data-txt')||'[语音]';targetBubNode=auBub;Q('.Qixian-jact-revoke').style.display=(targetRevokeRow&&targetRevokeRow.classList.contains('right'))?'block':'none';Q('.Qixian-jmsgact').classList.add('show');clearTimeout(auBub.playTimer);lastClickTime=0;}else{lastClickTime=now;lastClickTarget=auBub;auBub.playTimer=setTimeout(function(){playAudioNode(auBub);},300);}return;}
        if(bub&&!isLav&&!isRav&&!txt&&!gift&&!cp&&!mu&&!loc&&!pureTf){targetRevokeRow=bub.closest('.Qixian-row');targetRevokeText=bub.innerText||'[复杂内容]';targetBubNode=bub;Q('.Qixian-jact-revoke').style.display=(targetRevokeRow&&targetRevokeRow.classList.contains('right'))?'block':'none';Q('.Qixian-jmsgact').classList.add('show');return;}
        if(isLav||isRav){if(now-lastClickTime<300&&lastClickTarget===e.target){if(isLav){renderSysMsg(finalRName+' 拍了拍 '+finalLName+' '+finalCPat);appendCmd('$[拍一拍:'+finalRName+' 拍了拍 '+finalLName+' '+finalCPat+']');}else{renderSysMsg(finalRName+' 拍了拍自己 '+finalUPat);appendCmd('$[拍一拍:'+finalRName+' 拍了拍自己 '+finalUPat+']');}lastClickTime=0;return;}}
        lastClickTime=now;lastClickTarget=(isLav||isRav)?e.target:bub;
        if(txt){zoomIn.innerHTML=txt.innerHTML;zoomIn.className='Qixian-txt-zoom-in txt-img-zoom';zoom.classList.add('show');}else if(gift){zoomIn.innerHTML=gift.innerHTML;zoomIn.className='Qixian-txt-zoom-in gift-zoom';zoom.classList.add('show');}else if(cp){Q('.Qixian-jcpmodal').classList.add('show');}else if(mu){Q('.Qixian-jmumodal').classList.add('show');}else if(loc){Q('.Qixian-jlocmodal').classList.add('show');}
    });

    Q('.Qixian-jact-cancel').addEventListener('click',function(){Q('.Qixian-jmsgact').classList.remove('show');});
    Q('.Qixian-jact-reply').addEventListener('click',function(){showReplyBar(targetRevokeText.substring(0,30));Q('.Qixian-jmsgact').classList.remove('show');});
    Q('.Qixian-jtfact-cancel').addEventListener('click',function(){Q('.Qixian-jtfactmodal').classList.remove('show');});
    Q('.Qixian-jtfact-receive').addEventListener('click',function(){if(window.targetTfNode){window.targetTfNode.classList.add('got');window.targetTfNode.querySelector('.Qixian-tf-t').textContent='已收款';var amt=window.targetTfNode.getAttribute('data-amt')||'0.00';appendCmd(isBlkRight?'$[发送失败]':'$[收款:'+amt+']');playSwoosh();}Q('.Qixian-jtfactmodal').classList.remove('show');});
    Q('.Qixian-jtfact-return').addEventListener('click',function(){if(window.targetTfNode){window.targetTfNode.classList.add('returned');window.targetTfNode.querySelector('.Qixian-tf-t').textContent='已退回';var amt=window.targetTfNode.getAttribute('data-amt')||'0.00';appendCmd(isBlkRight?'$[发送失败]':'$[退回:'+amt+']');playSwoosh();}Q('.Qixian-jtfactmodal').classList.remove('show');});
    Q('.Qixian-jact-revoke').addEventListener('click',function(){if(targetRevokeRow&&targetRevokeRow.classList.contains('right')){var m=document.createElement('div');m.className='Qixian-sys-msg';m.innerHTML=finalRName+' 撤回了一条消息 <span class="Qixian-view-rev" data-txt="'+targetRevokeText.replace(/"/g,'&quot;')+'">重新编辑</span>';targetRevokeRow.parentNode.replaceChild(m,targetRevokeRow);appendCmd('$[撤回:'+finalRName+'|'+targetRevokeText+']');}Q('.Qixian-jmsgact').classList.remove('show');});
    Q('.Qixian-jtxtzoom').addEventListener('click',function(e){if(e.target===this)this.classList.remove('show');});
    Q('.Qixian-jviewclose').addEventListener('click',function(){Q('.Qixian-jviewmodal').classList.remove('show');});

    // ===== DRAW =====
    var drawCanvas=Q('.Qixian-jdrawcanvas'),drawCtx=drawCanvas.getContext('2d');var isDrawing=false,lastX=0,lastY=0,isEraser=false;var drawHistory=[];
    function saveDrawState(){drawHistory.push(drawCanvas.toDataURL());if(drawHistory.length>20)drawHistory.shift();}
    function resetDrawBoard(){drawCtx.globalCompositeOperation='source-over';drawCtx.fillStyle='#ffffff';drawCtx.fillRect(0,0,drawCanvas.width,drawCanvas.height);drawHistory=[];}
    Q('.Qixian-jbtn-draw').addEventListener('click',function(){openModal('.Qixian-jdrawmodal');setTimeout(resetDrawBoard,50);});
    function getDrawPos(e){var r=drawCanvas.getBoundingClientRect();var cx=e.touches?e.touches[0].clientX:e.clientX;var cy=e.touches?e.touches[0].clientY:e.clientY;return{x:cx-r.left,y:cy-r.top};}
    function startDraw(e){e.preventDefault();isDrawing=true;saveDrawState();var p=getDrawPos(e);lastX=p.x;lastY=p.y;}
    function runDraw(e){if(!isDrawing)return;e.preventDefault();var p=getDrawPos(e);drawCtx.beginPath();drawCtx.moveTo(lastX,lastY);drawCtx.lineTo(p.x,p.y);drawCtx.globalCompositeOperation=isEraser?'destination-out':'source-over';drawCtx.strokeStyle=Q('.Qixian-jdrawcolor').value;drawCtx.lineWidth=Q('.Qixian-jdrawwidth').value;if(isEraser){drawCtx.lineWidth=Math.max(10,Q('.Qixian-jdrawwidth').value*2);}drawCtx.lineCap='round';drawCtx.lineJoin='round';drawCtx.stroke();lastX=p.x;lastY=p.y;}
    function stopDraw(e){e.preventDefault();isDrawing=false;}
    drawCanvas.addEventListener('mousedown',startDraw);drawCanvas.addEventListener('mousemove',runDraw);drawCanvas.addEventListener('mouseup',stopDraw);drawCanvas.addEventListener('mouseout',stopDraw);drawCanvas.addEventListener('touchstart',startDraw,{passive:false});drawCanvas.addEventListener('touchmove',runDraw,{passive:false});drawCanvas.addEventListener('touchend',stopDraw,{passive:false});
    Q('.Qixian-jdrawclear').addEventListener('click',resetDrawBoard);
    Q('.Qixian-jdrawundo').addEventListener('click',function(){if(drawHistory.length>0){var img=new Image();img.src=drawHistory.pop();img.onload=function(){drawCtx.globalCompositeOperation='source-over';drawCtx.clearRect(0,0,drawCanvas.width,drawCanvas.height);drawCtx.drawImage(img,0,0);};}else{resetDrawBoard();}});
    Q('.Qixian-jdraweraser').addEventListener('click',function(){isEraser=!isEraser;this.style.background=isEraser?'#eeeeee':'';this.style.color=isEraser?'#333':'';});
    Q('.Qixian-jdrawcancel').addEventListener('click',function(){Q('.Qixian-jdrawmodal').classList.remove('show');});
    Q('.Qixian-jdrawok').addEventListener('click',function(){drawCtx.globalCompositeOperation='source-over';var b64=drawCanvas.toDataURL('image/jpeg',0.6);var shortId='local-draw-'+Date.now();try{QxStore.set('Qx-'+shortId,b64);}catch(e){}renderRight('<img src="'+b64+'" class="Qixian-img" alt="手绘涂鸦">',true,isBlkRight);playSwoosh();appendCmd(isBlkRight?'$[发送失败]':'$[图:'+shortId+'|手绘涂鸦]');Q('.Qixian-jdrawmodal').classList.remove('show');});

    // ===== CALL =====
    var callIntv=null,callSec=0,callState='none';
    function formatTime(sec){var m=String(Math.floor(sec/60)).padStart(2,'0');var s=String(sec%60).padStart(2,'0');return m+':'+s;}
    function openCallUI(type,state){
        var c=Q('.Qixian-jcall');c.className='Qixian-call Qixian-jcall show state-'+state+(type==='video'?' video':'');c.style.transform='none';
        if(type==='video'){Q('.Qixian-call-vbg').style.backgroundImage='url(\''+safeRAv+'\')';Q('.Qixian-bind-rav-bg').style.backgroundImage='url(\''+safeLAv+'\')';}
        else{var savedBg=QxStore.get('Qx-bg-img');var defaultBg=window.getComputedStyle(Q('.Qixian-jbg')).backgroundImage;if(savedBg&&savedBg!=='none'){Q('.Qixian-call-vbg').style.backgroundImage='url(\''+savedBg.replace(/'/g,'%27')+'\')';}else if(defaultBg&&defaultBg!=='none'){Q('.Qixian-call-vbg').style.backgroundImage=defaultBg;}else{Q('.Qixian-call-vbg').style.backgroundImage='';}}
        callSec=0;callState=state;clearInterval(callIntv);
        var panel=Q('.Qixian-jpanel');var plusBtn=Q('.Qixian-jplus');if(panel)panel.classList.remove('show');if(plusBtn)plusBtn.classList.remove('on');
    }
    function setActiveCall(forceType){
        if(callState==='active')return;callState='active';stopRing();
        var c=Q('.Qixian-jcall');c.classList.remove('state-in','state-out','minimized');c.classList.add('active','show');
        if(forceType==='video'){c.classList.add('video');Q('.Qixian-call-vbg').style.backgroundImage='url(\''+safeRAv+'\')';Q('.Qixian-bind-rav-bg').style.backgroundImage='url(\''+safeLAv+'\')';}
        Q('.Qixian-jcall-timer').textContent='00:00';callSec=0;clearInterval(callIntv);callIntv=setInterval(function(){callSec++;Q('.Qixian-jcall-timer').textContent=formatTime(callSec);},1000);
    }
    function closeCall(){stopRing();clearInterval(callIntv);Q('.Qixian-jcall').classList.remove('show','active','state-in','state-out','video','minimized');callState='none';}
    function addCallBubble(dir,text,doType){
        var wrap=document.createElement('div');wrap.className='Qixian-cb-wrap '+dir;var bub=document.createElement('div');bub.className='Qixian-cb';wrap.appendChild(bub);callBubsBox.appendChild(wrap);
        if(doType){var i=0;var timer=setInterval(function(){if(i<text.length){bub.innerHTML+=text.charAt(i);i++;callBubsBox.scrollTop=callBubsBox.scrollHeight;}else{clearInterval(timer);}},60);}else{bub.innerHTML=text;setTimeout(function(){callBubsBox.scrollTop=callBubsBox.scrollHeight;},50);}
    }
    Q('.Qixian-jbtn-voice').addEventListener('click',function(){openCallUI('voice','out');appendCmd(isBlkRight?'$[呼叫失败，拒收]':'$[呼叫:语音通话]');});
    Q('.Qixian-jbtn-video').addEventListener('click',function(){openCallUI('video','out');appendCmd(isBlkRight?'$[呼叫失败，拒收]':'$[呼叫:视频通话]');});
    Q('.Qixian-jcall-cancel').addEventListener('click',function(e){e.stopPropagation();closeCall();appendCmd('$[挂断通话]');});
    Q('.Qixian-jcall-answer').addEventListener('click',function(e){e.stopPropagation();setActiveCall();appendCmd('$[接听通话]');});
    Q('.Qixian-jcall-reject').addEventListener('click',function(e){e.stopPropagation();closeCall();renderRight('<div style="display:flex;align-items:center;gap:6px;"><div style="width:18px;height:18px;display:flex;align-items:center;justify-content:center;color:#666;"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M10.5 4.5l-2-2a2 2 0 0 0-2.83 0l-2 2a2 2 0 0 0 0 2.83l9 9a2 2 0 0 0 2.83 0l2-2a2 2 0 0 0 0-2.83z"/><path d="M14 8h5v5"/><path d="M19 8l-5 5"/></svg></div><span style="font-size:13px;color:#333;">已拒绝</span></div>',false,false);appendCmd('$[拒绝通话]');});
    Q('.Qixian-jcall-end').addEventListener('click',function(e){e.stopPropagation();var dur=formatTime(callSec);closeCall();appendCmd('$[挂断通话:'+dur+']');});
    Q('.Qixian-jcall-send').addEventListener('click',function(e){e.stopPropagation();var t=Q('.Qixian-jcall-in').value.trim();if(t){var isVid=Q('.Qixian-jcall').classList.contains('video');addCallBubble('right',t,false);playSwoosh();appendCmd((isVid?'$[视频:':'$[通话:')+t+']');Q('.Qixian-jcall-in').value='';}});

    var callDragItem=Q('.Qixian-jcall');var cDragging=false,cStartX=0,cStartY=0,cInitX=0,cInitY=0,cxOff=0,cyOff=0,cCurrX=0,cCurrY=0,cDragMoved=false;
    function cDragStart(e){if(!callDragItem.classList.contains('minimized'))return;cStartX=e.type==='touchstart'?e.touches[0].clientX:e.clientX;cStartY=e.type==='touchstart'?e.touches[0].clientY:e.clientY;cInitX=cStartX-cxOff;cInitY=cStartY-cyOff;cDragging=true;cDragMoved=false;}
    function cDrag(e){if(!cDragging)return;var cx=e.type==='touchmove'?e.touches[0].clientX:e.clientX;var cy=e.type==='touchmove'?e.touches[0].clientY:e.clientY;if(Math.abs(cx-cStartX)>5||Math.abs(cy-cStartY)>5)cDragMoved=true;if(cDragMoved)e.preventDefault();cCurrX=cx-cInitX;cCurrY=cy-cInitY;cxOff=cCurrX;cyOff=cCurrY;callDragItem.style.transform='translate3d('+cCurrX+'px,'+cCurrY+'px,0)';}
    function cDragEnd(){cInitX=cCurrX;cInitY=cCurrY;cDragging=false;}
    callDragItem.addEventListener('touchstart',cDragStart,{passive:false});document.addEventListener('touchmove',cDrag,{passive:false});document.addEventListener('touchend',cDragEnd);
    callDragItem.addEventListener('mousedown',cDragStart);document.addEventListener('mousemove',cDrag);document.addEventListener('mouseup',cDragEnd);
    callDragItem.addEventListener('click',function(e){if(this.classList.contains('minimized')&&!cDragMoved){this.classList.remove('minimized');cxOff=0;cyOff=0;this.style.transform='none';}});
    Q('.Qixian-jcall-mini-top').addEventListener('click',function(e){e.stopPropagation();Q('.Qixian-jcall').classList.add('minimized');});

    // ===== EMOJI =====
    var baseEmojiArr=[{i:'https://tuchuang.org.cn/imgs/2026/03/26/8abc1e15982dce90.png',t:'宝宝我惹你了吗？'},{i:'https://tuchuang.org.cn/imgs/2026/03/29/28482bc17ee1902a.png',t:'兄弟，我长得太帅被人打了'},{i:'https://tuchuang.org.cn/imgs/2026/03/29/c8edbc471b99ec2d.png',t:'分享位置，床上'},{i:'https://tuchuang.org.cn/imgs/2026/03/29/108aa5ff7f102a0f.png',t:'听说你要洗澡'},{i:'https://tuchuang.org.cn/imgs/2026/03/29/14bc30cf3153af0f.png',t:'不乘，打屁屁咯'},{i:'https://tuchuang.org.cn/imgs/2026/03/29/f28c9fdf5230efc0.png',t:'你也很为我着迷吧？'},{i:'https://tuchuang.org.cn/imgs/2026/03/29/603a9d2dd3ba1db1.png',t:'偶哭叻，你满意了吧？'},{i:'https://tuchuang.org.cn/imgs/2026/03/29/56d88bd75de484f0.png',t:'电你，在心跳吗？'},{i:'https://tuchuang.org.cn/imgs/2026/03/26/a2350084ec1eb9e1.jpg',t:'淦他妈的，我要吃软饭'},{i:'https://tuchuang.org.cn/imgs/2026/03/26/9638432efdd2a0dc.png',t:'哞哞哒[么么哒]'},{i:'https://tuchuang.org.cn/imgs/2026/03/26/ecc00661053e774d.png',t:'吐舌'},{i:'https://tuchuang.org.cn/imgs/2026/03/26/1a553718ed2b2347.png',t:'这个世界有问题'},{i:'https://tuchuang.org.cn/imgs/2026/03/27/d38af7021b9631f1.png',t:'让我喊出我爱你'},{i:'https://tuchuang.org.cn/imgs/2026/03/27/b68c231476fd9735.png',t:'一张古早叼花漫画图'},{i:'https://tuchuang.org.cn/imgs/2026/03/27/29907ae552edde90.png',t:'一张抽象的人物图'},{i:'https://tuchuang.org.cn/imgs/2026/03/27/a082ed0adae88380.png',t:'一张抽象龙图拿着杯子'},{i:'https://tuchuang.org.cn/imgs/2026/03/27/ca976c11387dc5e8.png',t:'一张龙图鄙夷的表情'},{i:'https://tuchuang.org.cn/imgs/2026/03/27/422696afc246a494.png',t:'一只猴子苍蝇搓手'},{i:'https://tuchuang.org.cn/imgs/2026/03/27/c21b68dbdf340f36.png',t:'一张搞怪龙图'},{i:'https://tuchuang.org.cn/imgs/2026/03/28/f369ba2676f4283c.png',t:'沸羊羊耍帅'},{i:'https://tuchuang.org.cn/imgs/2026/03/28/be2862ca6b4b0c3a.png',t:'一个抽象的简笔画'},{i:'https://tuchuang.org.cn/imgs/2026/03/28/e7362ce1784f5c46.png',t:'我要去找上帝告状'},{i:'https://pic1.imgdb.cn/item/6a4cab64531aaa3c3f265491.jpg',t:'简笔画龙图'},{i:'https://pic1.imgdb.cn/item/6a4caf33531aaa3c3f26590d.jpg',t:'出来亲嘴'}];
    var customEmoStr=QxStore.get('Qx-custom-emos');var customEmoArr=customEmoStr?JSON.parse(customEmoStr):[];
    function renderEmoList(){var all=customEmoArr.concat(baseEmojiArr);var html=all.map(function(x){return '<div class="Qixian-emo-card" data-url="'+x.i+'" data-txt="'+x.t+'"><img class="Qixian-emo-img" src="'+x.i+'"><div class="Qixian-emo-t">'+x.t+'</div></div>';}).join('');Q('.Qixian-jemolist').innerHTML=html;QA('.Qixian-emo-card').forEach(function(c){c.addEventListener('click',function(){renderRight('<img src="'+this.getAttribute('data-url')+'" class="Qixian-img" alt="'+this.getAttribute('data-txt')+'">',true,isBlkRight);playSwoosh();appendCmd(isBlkRight?'!['+this.getAttribute('data-txt')+'](发送失败)':'!['+this.getAttribute('data-txt')+']('+this.getAttribute('data-url')+')');Q('.Qixian-jemomodal').classList.remove('show');});});}
    renderEmoList();
    Q('.Qixian-jaddemobtn').addEventListener('click',function(){Q('.Qixian-jaddemomodal').classList.add('show');Q('.Qixian-jemomodal').classList.remove('show');});
    Q('.Qixian-jaddemocancel').addEventListener('click',function(){Q('.Qixian-jaddemomodal').classList.remove('show');Q('.Qixian-jemomodal').classList.add('show');});
    Q('.Qixian-jaddemook').addEventListener('click',function(){var u=Q('.Qixian-jaddemourl').value.trim(),t=Q('.Qixian-jaddemotxt').value.trim()||'自定义表情';if(u){customEmoArr.unshift({i:u,t:t});QxStore.set('Qx-custom-emos',JSON.stringify(customEmoArr));renderEmoList();Q('.Qixian-jaddemourl').value='';Q('.Qixian-jaddemotxt').value='';}Q('.Qixian-jaddemomodal').classList.remove('show');Q('.Qixian-jemomodal').classList.add('show');});
    Q('.jemo-poke').addEventListener('click',function(){var ic='<div class="Qixian-interact-item Qixian-anim-poke"><svg viewBox="0 0 24 24"><path d="M11 2a2 2 0 0 0-2 2v5H6a2 2 0 0 0-2 2v2c0 4.4 3.6 8 8 8h3a5 5 0 0 0 5-5v-6a2 2 0 0 0-2-2h-3V4a2 2 0 0 0-2-2z"/></svg></div>';renderRight(ic,true,isBlkRight);appendCmd(isBlkRight?'$[发送失败]':'$[戳一戳:'+finalRName+' 戳了戳 '+finalLName+']');playSwoosh();Q('.Qixian-jemomodal').classList.remove('show');});
    Q('.jemo-dice').addEventListener('click',function(){var pt=Math.floor(Math.random()*6)+1;var dots='';if(pt===1)dots='<circle cx="12" cy="12" r="1.5"/>';else if(pt===2)dots='<circle cx="8.5" cy="8.5" r="1.5"/><circle cx="15.5" cy="15.5" r="1.5"/>';else if(pt===3)dots='<circle cx="8.5" cy="8.5" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="15.5" cy="15.5" r="1.5"/>';else if(pt===4)dots='<circle cx="8.5" cy="8.5" r="1.5"/><circle cx="15.5" cy="15.5" r="1.5"/><circle cx="8.5" cy="15.5" r="1.5"/><circle cx="15.5" cy="8.5" r="1.5"/>';else if(pt===5)dots='<circle cx="8.5" cy="8.5" r="1.5"/><circle cx="15.5" cy="15.5" r="1.5"/><circle cx="8.5" cy="15.5" r="1.5"/><circle cx="15.5" cy="8.5" r="1.5"/><circle cx="12" cy="12" r="1.5"/>';else dots='<circle cx="8.5" cy="7" r="1.5"/><circle cx="15.5" cy="7" r="1.5"/><circle cx="8.5" cy="12" r="1.5"/><circle cx="15.5" cy="12" r="1.5"/><circle cx="8.5" cy="17" r="1.5"/><circle cx="15.5" cy="17" r="1.5"/>';var ic='<div class="Qixian-interact-item Qixian-anim-dice"><svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>'+dots+'</svg></div>';renderRight(ic,true,isBlkRight);appendCmd(isBlkRight?'$[发送失败]':'$[摇骰子:'+pt+'点]');playSwoosh();Q('.Qixian-jemomodal').classList.remove('show');});
    Q('.jemo-rps').addEventListener('click',function(){var arr=['剪刀','石头','布'];var res=arr[Math.floor(Math.random()*3)];var qSvg='';if(res==='剪刀')qSvg='<svg viewBox="0 0 24 24"><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><line x1="20" y1="4" x2="8.12" y2="15.88"/><line x1="14.47" y1="14.48" x2="20" y2="20"/><line x1="8.12" y1="8.12" x2="12" y2="12"/></svg>';else if(res==='石头')qSvg='<svg viewBox="0 0 24 24"><path d="M10 15v-5a2 2 0 0 1 4 0v5"/><path d="M14 15v-4a2 2 0 0 1 4 0v4"/><path d="M6 15v-3a2 2 0 0 1 4 0v3"/><path d="M18 15v-2a2 2 0 0 1 4 0v3c0 4-3 7-7 7H9c-4 0-7-3-7-7v-3a2 2 0 0 1 4 0v4"/></svg>';else qSvg='<svg viewBox="0 0 24 24"><path d="M10 15V4a2 2 0 0 1 4 0v11"/><path d="M14 15V5a2 2 0 0 1 4 0v10"/><path d="M6 15V6a2 2 0 0 1 4 0v9"/><path d="M18 15v-2a2 2 0 0 1 4 0v3c0 4-3 7-7 7H9c-4 0-7-3-7-7V9a2 2 0 0 1 4 0v6"/></svg>';var ic='<div class="Qixian-interact-item Qixian-anim-rps">'+qSvg+'</div>';renderRight(ic,true,isBlkRight);appendCmd(isBlkRight?'$[发送失败]':'$[猜拳:'+res+']');playSwoosh();Q('.Qixian-jemomodal').classList.remove('show');});

    // ===== INPUT & SEND =====
    var textInput=Q('.Qixian-jinput'),sendBtn=Q('.Qixian-jsend');
    function sendText(){var v=textInput.value.trim();if(!v)return;if(pendingReply){renderRight('<div class="Qixian-quote-box">'+pendingReply+'</div>'+v,false,isBlkRight);appendCmd(isBlkRight?'$[拉黑拒收]':(finalRName+' | [引用:'+pendingReply+'] '+v));Q('.Qixian-jrepclose').click();}else{renderRight(v,false,isBlkRight);appendCmd(isBlkRight?'$[消息被拒收]':(finalRName+' | '+v));}textInput.value='';playSwoosh();}
    sendBtn.addEventListener('click',sendText);
    textInput.addEventListener('keydown',function(e){if(e.key==='Enter'){e.preventDefault();sendText();}});

    var plusBtn=Q('.Qixian-jplus'),panel=Q('.Qixian-jpanel');
    plusBtn.addEventListener('click',function(){plusBtn.classList.toggle('on');panel.classList.toggle('show');});
    function openModal(sel){Q(sel).classList.add('show');panel.classList.remove('show');plusBtn.classList.remove('on');}

    // ===== ALL MODAL BUTTONS =====
    Q('.Qixian-jgiftbtn').addEventListener('click',function(){openModal('.Qixian-jgiftmodal');});
    Q('.Qixian-jgiftcancel').addEventListener('click',function(){Q('.Qixian-jgiftmodal').classList.remove('show');});
    Q('.Qixian-jlinkbtn').addEventListener('click',function(){openModal('.Qixian-jlinkmodal');});
    Q('.Qixian-jlinkcancel').addEventListener('click',function(){Q('.Qixian-jlinkmodal').classList.remove('show');});
    Q('.Qixian-jtf').addEventListener('click',function(){openModal('.Qixian-jtfmodal');});
    Q('.Qixian-jtfcancel').addEventListener('click',function(){Q('.Qixian-jtfmodal').classList.remove('show');});
    Q('.Qixian-jemo').addEventListener('click',function(){openModal('.Qixian-jemomodal');});
    Q('.Qixian-jemoclose').addEventListener('click',function(){Q('.Qixian-jemomodal').classList.remove('show');});
    Q('.Qixian-jmusic').addEventListener('click',function(){openModal('.Qixian-jmumodal');});
    Q('.Qixian-jmuclose').addEventListener('click',function(){Q('.Qixian-jmumodal').classList.remove('show');});
    Q('.Qixian-jcp').addEventListener('click',function(){openModal('.Qixian-jcpmodal');});
    Q('.Qixian-jcpclose').addEventListener('click',function(){Q('.Qixian-jcpmodal').classList.remove('show');});
    Q('.Qixian-jtxtimg').addEventListener('click',function(){openModal('.Qixian-jtxtimgmodal');});
    Q('.Qixian-jtxtimgcancel').addEventListener('click',function(){Q('.Qixian-jtxtimgmodal').classList.remove('show');Q('.Qixian-jtxtimgin').value='';});
    Q('.Qixian-jimgbtn').addEventListener('click',function(){openModal('.Qixian-jimgmodal');});
    Q('.Qixian-jimgcancel').addEventListener('click',function(){Q('.Qixian-jimgmodal').classList.remove('show');Q('.Qixian-jimgurl').value='';Q('.Qixian-jimgdesc').value='';});
    Q('.Qixian-jbtn-loc').addEventListener('click',function(){openModal('.Qixian-jlocmodal');});
    Q('.Qixian-jlocclose').addEventListener('click',function(){Q('.Qixian-jlocmodal').classList.remove('show');});
    Q('.Qixian-jbtn-food').addEventListener('click',function(){openModal('.Qixian-jfoodmodal');});
    Q('.Qixian-jfoodcancel').addEventListener('click',function(){Q('.Qixian-jfoodmodal').classList.remove('show');});

    Q('.Qixian-jgiftok').addEventListener('click',function(){var pr=Q('.Qixian-jgiftpr').value||'0',desc=Q('.Qixian-jgiftdesc').value||'精美礼物',note=Q('.Qixian-jgiftnote').value||'';renderRight('<div class="Qixian-link-card Qixian-gift-card"><div class="Qixian-link-ic" style="background:rgba(255,255,255,0.6);"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="8" width="18" height="4" rx="1"></rect><path d="M12 8v13"></path><path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"></path><path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5"></path></svg></div><div class="Qixian-tf-info"><div class="Qixian-tf-t">'+desc+'</div><div class="Qixian-tf-a" style="color:var(--sys-txt);">¥ '+parseFloat(pr).toFixed(2)+(note?' - '+note:'')+'</div></div></div>',true,isBlkRight);playSwoosh();appendCmd(isBlkRight?'$[发送失败]':'$[礼物:'+pr+'|'+desc+'|'+note+']');Q('.Qixian-jgiftmodal').classList.remove('show');Q('.Qixian-jgiftpr').value='';Q('.Qixian-jgiftdesc').value='';Q('.Qixian-jgiftnote').value='';});
    Q('.Qixian-jlinkok').addEventListener('click',function(){var url=Q('.Qixian-jlinkurl').value.trim(),title=Q('.Qixian-jlinktitle').value.trim()||'网页链接';if(url){renderRight('<a href="javascript:;" class="Qixian-link-card"><div class="Qixian-link-ic"><svg viewBox="0 0 24 24" stroke="currentColor" fill="none" stroke-width="1.8"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></div><div class="Qixian-tf-info"><div class="Qixian-tf-t">'+title+'</div><div class="Qixian-tf-a" style="color:var(--sys-txt);">'+url+'</div></div></a>',true,isBlkRight);playSwoosh();appendCmd(isBlkRight?'$[发送失败]':'$[链接分享:'+title+'|'+url+']');Q('.Qixian-jlinkmodal').classList.remove('show');Q('.Qixian-jlinkurl').value='';Q('.Qixian-jlinktitle').value='';}});
    Q('.Qixian-jtfok').addEventListener('click',function(){var amt=Q('.Qixian-jtfamt').value,title=Q('.Qixian-jtftitle').value||'转账';if(amt>0){renderRight('<div class="Qixian-tf Qixian-j-pure-tf" data-amt="'+parseFloat(amt).toFixed(2)+'"><div class="Qixian-tf-ic">¥</div><div class="Qixian-tf-info"><div class="Qixian-tf-t">'+title+'</div><div class="Qixian-tf-a">¥ '+parseFloat(amt).toFixed(2)+'</div><div class="Qixian-tf-f">微信转账</div></div></div>',true,isBlkRight);playSwoosh();appendCmd(isBlkRight?'$[发送失败]':'$[转账:'+parseFloat(amt).toFixed(2)+':'+title+']');Q('.Qixian-jtfmodal').classList.remove('show');Q('.Qixian-jtfamt').value='';Q('.Qixian-jtftitle').value='';}});
    Q('.Qixian-jimgok').addEventListener('click',function(){var url=Q('.Qixian-jimgurl').value.trim(),desc=Q('.Qixian-jimgdesc').value.trim()||'图片';if(url){var realUrl=getRealImgUrl(url);renderRight('<img src="'+realUrl+'" class="Qixian-img" alt="'+desc+'">',true,isBlkRight);playSwoosh();appendCmd(isBlkRight?'$[发送失败]':'$[图:'+url+'|'+desc+']');Q('.Qixian-jimgmodal').classList.remove('show');Q('.Qixian-jimgurl').value='';Q('.Qixian-jimgdesc').value='';}});
    Q('.Qixian-jtxtimgok').addEventListener('click',function(){var txt=Q('.Qixian-jtxtimgin').value.trim();if(txt){renderRight('<div class="Qixian-txt-img">'+txt+'</div>',true,isBlkRight);playSwoosh();appendCmd(isBlkRight?'$[发送失败]':'$[文图:'+txt+']');Q('.Qixian-jtxtimgmodal').classList.remove('show');Q('.Qixian-jtxtimgin').value='';}});
    Q('.Qixian-jfoodok').addEventListener('click',function(){var shop=Q('.Qixian-jfoodshop').value.trim()||'外卖派送';var items=Q('.Qixian-jfooditems').value.trim()||'神秘大餐';var addr=Q('.Qixian-jfoodaddr').value.trim()||'默认地址';var name=Q('.Qixian-jfoodname').value.trim()||'收件人';var phone=Q('.Qixian-jfoodphone').value.trim()||'138****0000';renderRight('<div class="Qixian-tf Qixian-food-card"><div class="Qixian-food-ic" style="background:rgba(255,255,255,0.6);"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 8h1a4 4 0 1 1 0 8h-1"></path><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"></path><line x1="6" y1="2" x2="6" y2="4"></line><line x1="10" y1="2" x2="10" y2="4"></line><line x1="14" y1="2" x2="14" y2="4"></line></svg></div><div class="Qixian-tf-info"><div class="Qixian-tf-t">'+shop+'</div><div class="Qixian-tf-a" style="color:var(--sys-txt);">'+items+'</div><div class="Qixian-tf-f" style="margin-top:2px;padding-top:2px;">'+addr+'</div></div></div>',true,isBlkRight);playSwoosh();appendCmd(isBlkRight?'$[发送失败]':'$[外卖订单:'+shop+'|'+items+'|'+name+' '+phone+' '+addr+']');Q('.Qixian-jfoodmodal').classList.remove('show');Q('.Qixian-jfoodshop').value='';Q('.Qixian-jfooditems').value='';Q('.Qixian-jfoodaddr').value='';Q('.Qixian-jfoodname').value='';Q('.Qixian-jfoodphone').value='';});
    Q('.Qixian-jlocsend').addEventListener('click',function(){Q('.Qixian-jlocinputmodal').classList.add('show');});
    Q('.Qixian-jlocincancel').addEventListener('click',function(){Q('.Qixian-jlocinputmodal').classList.remove('show');});
    Q('.Qixian-jlocinok').addEventListener('click',function(){var p=Q('.Qixian-jlocin-pos').value.trim()||'我的位置';var d=Q('.Qixian-jlocin-dist').value.trim()||'未知距离';renderRight('<div class="Qixian-tf Qixian-loc-card"><div class="Qixian-link-ic" style="border-radius:50%;"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg></div><div class="Qixian-tf-info"><div class="Qixian-tf-t">'+p+'</div><div class="Qixian-tf-a" style="color:var(--sys-txt);">'+(d.includes('距离')?d:'距离 '+d)+'</div></div></div>',true,isBlkRight);playSwoosh();appendCmd(isBlkRight?'$[发送失败]':'$[定位分享:'+p+'|'+(d.includes('距离')?d:'距离 '+d)+']');Q('.Qixian-jlocinputmodal').classList.remove('show');Q('.Qixian-jlocmodal').classList.remove('show');Q('.Qixian-jlocin-pos').value='';Q('.Qixian-jlocin-dist').value='';});

    // ===== VOICE =====
    var micBtn=Q('.Qixian-jmic'),isRec=false,finalTxt='';
    var SR=window.SpeechRecognition||window.webkitSpeechRecognition;
    window.voiceObj=null;
    var mediaRec=null,recStartTime=0;
    var tempVoiceDur=null;
    function voiceBubble(txt,dur){renderRight('<div class="Qixian-au" data-txt="'+txt+'"><div class="Qixian-au-main"><div class="Qixian-au-play"></div><div class="Qixian-au-bars"><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div><div class="Qixian-au-dur">'+dur+'</div></div><div class="Qixian-au-wrap"><div class="Qixian-au-txt">'+txt+'</div></div></div>',true,isBlkRight);playSwoosh();appendCmd(isBlkRight?'$[发送失败]':'$[语音:'+dur+'|'+txt+']');}
    function fallback(err){var modal=Q('.Qixian-jvoicemodal');var txtArea=Q('.Qixian-jvoicetxt');modal.classList.add('show');txtArea.value='';txtArea.placeholder=(err?err+'，':'')+'麦克风降级，请手动输入刚刚语音内容的文字...';setTimeout(function(){txtArea.focus();},100);}
    Q('.Qixian-jvoicecancel').addEventListener('click',function(){Q('.Qixian-jvoicemodal').classList.remove('show');tempVoiceDur=null;});
    Q('.Qixian-jvoiceok').addEventListener('click',function(){var txt=Q('.Qixian-jvoicetxt').value.trim();if(txt){var dur=tempVoiceDur||(Math.max(1,Math.round(txt.length/4))+'"');voiceBubble(txt,dur);}Q('.Qixian-jvoicemodal').classList.remove('show');tempVoiceDur=null;});
    function setupSR(){if(window.voiceObj)return true;if(!SR)return false;try{window.voiceObj=new SR();window.voiceObj.continuous=true;window.voiceObj.interimResults=true;window.voiceObj.onresult=function(ev){for(var i=ev.resultIndex;i<ev.results.length;i++){if(ev.results[i].isFinal)finalTxt+=ev.results[i][0].transcript;}};window.voiceObj.onerror=function(ev){if(ev.error!=='no-speech'){isRec=false;micBtn.classList.remove('rec');fallback(ev.error==='not-allowed'?'权限被拒':'识别被中断');}};window.voiceObj.onend=function(){if(isRec){try{window.voiceObj.start();}catch(e){}}else{micBtn.classList.remove('rec');if(finalTxt.trim())voiceBubble(finalTxt.trim(),Math.max(1,Math.round(finalTxt.length/4))+'"');}};return true;}catch(e){return false;}}
    function startMediaRecord(){if(navigator.mediaDevices&&navigator.mediaDevices.getUserMedia){navigator.mediaDevices.getUserMedia({audio:true}).then(function(stream){var MR=window.MediaRecorder;mediaRec=new MR(stream);mediaRec.onstop=function(){var dur=Math.max(1,Math.round((Date.now()-recStartTime)/1000));stream.getTracks().forEach(function(t){t.stop();});tempVoiceDur=dur+'"';fallback('语音录制完毕 (真实时长: '+dur+'秒)');};recStartTime=Date.now();mediaRec.start();isRec=true;micBtn.classList.add('rec');}).catch(function(){fallback('麦克风被占用或拒绝');});}else{fallback('浏览器环境不支持录音');}}
    micBtn.addEventListener('click',function(e){e.preventDefault();if(isRec){isRec=false;micBtn.classList.remove('rec');if(window.voiceObj){try{window.voiceObj.stop();}catch(err){}}if(mediaRec&&mediaRec.state!=='inactive'){try{mediaRec.stop();}catch(err){}}}else{var isEdgeAndroid=navigator.userAgent.includes('EdgA');if(SR&&!isEdgeAndroid&&setupSR()){finalTxt='';try{window.voiceObj.lang=langMap[langIdx].l;window.voiceObj.start();isRec=true;micBtn.classList.add('rec');}catch(err){isRec=false;micBtn.classList.remove('rec');fallback('引擎启动异常');}}else{startMediaRecord();}}});

    // ===== MUSIC =====
    var muList=[],muIdx=0,muPlaying=false,muIntv=null,muSec=0;
    function renderMuList(){var html=muList.map(function(s,i){return '<div class="Qixian-mu-item'+(i===muIdx?' active':'')+'" data-idx="'+i+'"><span>'+s.name+' - '+s.artist+'</span><span class="jmudel" data-idx="'+i+'">×</span></div>';}).join('');Q('.Qixian-jmulist').innerHTML=html||'<div style="text-align:center;color:#aaa;font-size:12px;padding:20px;">暂无歌曲</div>';QA('.Qixian-mu-item').forEach(function(el){el.addEventListener('click',function(e){if(e.target.classList.contains('jmudel')){e.stopPropagation();var di=parseInt(e.target.getAttribute('data-idx'));muList.splice(di,1);if(muIdx>=muList.length)muIdx=0;renderMuList();return;}muIdx=parseInt(this.getAttribute('data-idx'));playMu();});});}
    function playMu(){if(muList.length===0)return;var s=muList[muIdx];Q('.Qixian-jmunow').textContent=s.name+' - '+s.artist;Q('.Qixian-jmuwaves').classList.add('playing');muPlaying=true;Q('.Qixian-jmuicon').innerHTML='<rect x="6" y="4" width="4" height="16" fill="#222"/><rect x="14" y="4" width="4" height="16" fill="#222"/>';if(s.cover){QA('.Qixian-jmuf1,.Qixian-jmuf2').forEach(function(el){el.style.backgroundImage='url('+s.cover+')';});}muSec=0;clearInterval(muIntv);muIntv=setInterval(function(){muSec++;var el=document.getElementById('Qx-mutime-val');if(el)el.textContent=Math.floor(muSec/60);},1000);}
    function pauseMu(){muPlaying=false;Q('.Qixian-jmuwaves').classList.remove('playing');Q('.Qixian-jmuicon').innerHTML='<polygon points="7 4 19 12 7 20 7 4" fill="#222"/>';clearInterval(muIntv);}
    Q('.Qixian-jmuplay').addEventListener('click',function(){if(muPlaying){pauseMu();}else{playMu();}});
    Q('.Qixian-jmuprev').addEventListener('click',function(){if(muList.length===0)return;muIdx=(muIdx-1+muList.length)%muList.length;playMu();});
    Q('.Qixian-jmunext').addEventListener('click',function(){if(muList.length===0)return;muIdx=(muIdx+1)%muList.length;playMu();});
    Q('.Qixian-jmuaddbtn').addEventListener('click',function(){var name=Q('.Qixian-jmuname').value.trim()||'未命名';var artist=Q('.Qixian-jmuartist').value.trim()||'未知歌手';var cover=Q('.Qixian-jmucover').value.trim();var url=Q('.Qixian-jmuinp').value.trim();muList.push({name:name,artist:artist,cover:cover,url:url});renderMuList();Q('.Qixian-jmuname').value='';Q('.Qixian-jmuartist').value='';Q('.Qixian-jmucover').value='';Q('.Qixian-jmuinp').value='';});
    Q('.Qixian-jmuinv').addEventListener('click',function(){if(muList.length===0){renderSysMsg('请先添加歌曲');return;}var s=muList[muIdx];renderRight('<div class="Qixian-music-share-card"><div class="Qixian-msc-top"><div class="Qixian-msc-cover" style="background-image:url('+(s.cover||'')+')"><div class="Qixian-msc-playic"><svg viewBox="0 0 24 24"><polygon points="7 4 19 12 7 20 7 4"/></svg></div></div><div class="Qixian-msc-info"><div class="Qixian-msc-name">'+s.name+'</div><div class="Qixian-msc-artist">'+s.artist+'</div></div></div><div class="Qixian-msc-bot"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>一起听歌</div></div>',true,isBlkRight);playSwoosh();appendCmd(isBlkRight?'$[发送失败]':'$[一起听歌:'+s.name+'|'+s.artist+']');Q('.Qixian-jmumodal').classList.remove('show');});
    renderMuList();

    // ===== COUPLE SPACE =====
    var cpThings=JSON.parse(QxStore.get('Qx-cp-things')||'[]');
    var cpDays=JSON.parse(QxStore.get('Qx-cp-days')||'[]');
    var cpAlbums=JSON.parse(QxStore.get('Qx-cp-albums')||'[]');
    function renderCpThings(){var html=cpThings.map(function(t,i){return '<div class="Qixian-cp-thing'+(t.done?' done':'')+'" data-idx="'+i+'"><div class="dot"></div><span>'+(t.who==='Me'?finalRName:finalLName)+': '+t.text+'</span></div>';}).join('');Q('.Qixian-jcpthings').innerHTML=html||'<div style="text-align:center;color:#aaa;font-size:12px;padding:10px;">还没有想做的小事</div>';QA('.Qixian-cp-thing').forEach(function(el){el.addEventListener('click',function(){var idx=parseInt(this.getAttribute('data-idx'));cpThings[idx].done=!cpThings[idx].done;QxStore.set('Qx-cp-things',JSON.stringify(cpThings));renderCpThings();});});}
    function renderCpDays(){var html=cpDays.map(function(d){var dDate=new Date(d.date);var now=new Date();var diff=Math.ceil((now-dDate)/(1000*60*60*24));return '<div class="Qixian-cp-day"><span>'+d.name+'</span><b>'+(diff>=0?diff+'天前':'还有'+Math.abs(diff)+'天')+'</b></div>';}).join('');Q('.Qixian-jcpdays').innerHTML=html||'<div style="text-align:center;color:#aaa;font-size:12px;padding:10px;">还没有纪念日</div>';}
    function renderCpAlbums(){var html=cpAlbums.map(function(a){if(a.img){return '<div class="Qixian-cp-album-card"><div class="Qixian-cp-album-img" style="background-image:url('+a.img+')"></div><div class="Qixian-cp-album-who">'+a.who+'</div><div class="Qixian-cp-album-txt">'+a.txt+'</div></div>';}else{return '<div class="Qixian-cp-album-card"><div class="Qixian-cp-album-txt-only">'+a.txt+'</div></div>';}}).join('');Q('.Qixian-jcpalbums').innerHTML=html||'<div style="text-align:center;color:#aaa;font-size:12px;padding:10px;grid-column:1/-1;">还没有相册</div>';}
    Q('.Qixian-jcpthingadd').addEventListener('click',function(){var text=Q('.Qixian-jcpthingin').value.trim();var who=Q('.Qixian-jcpwho').value;if(text){cpThings.push({text:text,who:who,done:false});QxStore.set('Qx-cp-things',JSON.stringify(cpThings));renderCpThings();Q('.Qixian-jcpthingin').value='';}});
    Q('.Qixian-jcpdayadd').addEventListener('click',function(){var name=Q('.Qixian-jcpdayname').value.trim();var date=Q('.Qixian-jcpdaydate').value;if(name&&date){cpDays.push({name:name,date:date});QxStore.set('Qx-cp-days',JSON.stringify(cpDays));renderCpDays();Q('.Qixian-jcpdayname').value='';Q('.Qixian-jcpdaydate').value='';}});
    Q('.Qixian-jcpalbumadd').addEventListener('click',function(){var txt=Q('.Qixian-jcpalbumtxt').value.trim();var img=Q('.Qixian-jcpalbumimg').value.trim();if(txt||img){cpAlbums.unshift({txt:txt||'图片',img:img,who:finalRName});QxStore.set('Qx-cp-albums',JSON.stringify(cpAlbums));renderCpAlbums();Q('.Qixian-jcpalbumtxt').value='';Q('.Qixian-jcpalbumimg').value='';}});
    var cSign=QxStore.get('Qx-csign')||'';var uSign=QxStore.get('Qx-usign')||'';
    Q('.Qixian-jcsign').textContent=cSign;
    Q('.Qixian-jusign-disp').textContent=uSign;
    Q('.Qixian-jusignsave').addEventListener('click',function(){var val=Q('.Qixian-jusignin').value.trim();if(val){uSign=val;QxStore.set('Qx-usign',val);Q('.Qixian-jusign-disp').textContent=val;Q('.Qixian-jusignin').value='';appendCmd('$[更新个签:'+val+']');}});
    Q('.Qixian-jsigndel').addEventListener('click',function(){uSign='';QxStore.set('Qx-usign','');Q('.Qixian-jusign-disp').textContent='';});
    Q('.Qixian-jcprel').textContent='相恋中 · 永远在一起';
    renderCpThings();renderCpDays();renderCpAlbums();

    // ===== PYQ (朋友圈) =====
    var pyqList=JSON.parse(QxStore.get('Qx-pyq-list')||'[]');
    function renderPyq(){
        var html=pyqList.map(function(p){
            var h='<div class="Qixian-pyq-item" data-id="'+p.id+'"><div class="Qixian-pyq-delbtn jpyqdel" data-id="'+p.id+'" title="删除"><svg viewBox="0 0 24 24"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg></div>';
            var avStyle=p.uav?' style="background-image:url(\''+p.uav.replace(/'/g,'%27')+'\')"':'';
            h+='<div class="Qixian-pyq-iav"'+avStyle+'></div><div class="Qixian-pyq-ict"><div class="Qixian-pyq-inm">'+p.uname+'</div>';
            if(p.txt)h+='<div class="Qixian-pyq-itxt">'+p.txt+'</div>';
            if(p.txtimg)h+='<div class="Qixian-pyq-txtimg Qixian-txt-img">'+p.txtimg+'</div>';
            else if(p.img)h+='<img src="'+getRealImgUrl(p.img)+'" class="Qixian-pyq-iimg">';
            h+='<div class="Qixian-pyq-ibot"><span>'+p.time+'</span><div class="Qixian-pyq-iacts"><div class="Qixian-pyq-btn jpyqlike" data-id="'+p.id+'"><svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>'+(p.likes&&p.likes.length?' '+p.likes.length:'')+'</div><div class="Qixian-pyq-btn jpyqcom" data-id="'+p.id+'"><svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>'+(p.comments&&p.comments.length?' '+p.comments.length:'')+'</div></div></div>';
            if(p.likes&&p.likes.length||p.comments&&p.comments.length){h+='<div class="Qixian-pyq-ints">';if(p.likes&&p.likes.length)h+='<div class="Qixian-pyq-likes"><svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>'+p.likes.join('、')+'</div>';if(p.comments&&p.comments.length){h+='<div class="Qixian-pyq-coms">';p.comments.forEach(function(c){h+='<div class="Qixian-pyq-com"><span>'+c.from+'</span>：'+c.text+'</div>';});h+='</div>';}h+='</div>';}
            h+='</div></div>';return h;
        }).join('');
        Q('.Qixian-jpyqlist').innerHTML=html;
        QA('.jpyqlike').forEach(function(btn){btn.addEventListener('click',function(){var id=this.getAttribute('data-id');var p=pyqList.find(function(x){return x.id===id;});if(!p)return;if(!p.likes)p.likes=[];if(p.likes.indexOf(finalRName)===-1){p.likes.push(finalRName);appendCmd('$[点赞朋友圈]');}else{p.likes=p.likes.filter(function(n){return n!==finalRName;});}QxStore.set('Qx-pyq-list',JSON.stringify(pyqList));renderPyq();});});
        QA('.jpyqcom').forEach(function(btn){btn.addEventListener('click',function(){curPyqIdx=this.getAttribute('data-id');Q('.Qixian-jpyqcomtxt').value='';Q('.Qixian-jpyqcommodal').classList.add('show');});});
        QA('.jpyqdel').forEach(function(btn){btn.addEventListener('click',function(e){e.stopPropagation();var id=this.getAttribute('data-id');pyqList=pyqList.filter(function(x){return x.id!==id;});QxStore.set('Qx-pyq-list',JSON.stringify(pyqList));renderPyq();appendCmd('$[删除朋友圈]');});});
    }
    var curPyqIdx=-1;
    Q('.Qixian-jpyqbtn').addEventListener('click',function(){Q('.Qixian-jpyqpanel').classList.add('show');renderPyq();});
    Q('.Qixian-jpyqback').addEventListener('click',function(){Q('.Qixian-jpyqpanel').classList.remove('show');});
    Q('.Qixian-jpyqadd').addEventListener('click',function(){Q('.Qixian-jpyqsendmodal').classList.add('show');});
    Q('.Qixian-jpyqsendcancel').addEventListener('click',function(){Q('.Qixian-jpyqsendmodal').classList.remove('show');});
    Q('.Qixian-jpyqsendok').addEventListener('click',function(){
        var t=Q('.Qixian-jpyqsendtxt').value.trim();var i=Q('.Qixian-jpyqsendimg').value.trim();var ti=Q('.Qixian-jpyqsendtxtimg').value.trim();
        if(t||i||ti){
            var newId='pyq_'+Date.now();
            var pyqUav=QxStore.get('Qx-pyq-uav')||safeRAv;
            pyqList.unshift({id:newId,txt:t,img:i,txtimg:ti,uname:finalRName,uav:pyqUav,time:'刚刚',likes:[],comments:[]});
            QxStore.set('Qx-pyq-list',JSON.stringify(pyqList));
            appendCmd('$[发布朋友圈:'+t+'|'+(i?i:(ti?'text:'+ti:''))+']');
            renderPyq();
            Q('.Qixian-jpyqsendmodal').classList.remove('show');
            Q('.Qixian-jpyqsendtxt').value='';Q('.Qixian-jpyqsendimg').value='';Q('.Qixian-jpyqsendtxtimg').value='';
        }
    });
    Q('.Qixian-jpyqcomcancel').addEventListener('click',function(){Q('.Qixian-jpyqcommodal').classList.remove('show');});
    Q('.Qixian-jpyqcomok').addEventListener('click',function(){var t=Q('.Qixian-jpyqcomtxt').value.trim();if(t){var p=pyqList.find(function(x){return x.id===curPyqIdx;});if(p){if(!p.comments)p.comments=[];p.comments.push({from:finalRName,text:t});QxStore.set('Qx-pyq-list',JSON.stringify(pyqList));renderPyq();appendCmd('$[评论朋友圈:'+t+']');}Q('.Qixian-jpyqcommodal').classList.remove('show');Q('.Qixian-jpyqcomtxt').value='';}});
    Q('.Qixian-jpyq-uav').addEventListener('click',function(){var fileInp=document.createElement('input');fileInp.type='file';fileInp.accept='image/*';fileInp.onchange=function(e){var f=e.target.files[0];if(!f)return;var reader=new FileReader();reader.onload=function(re){var b64=re.target.result;QxStore.set('Qx-pyq-uav',b64);Q('.Qixian-jpyq-uav').style.backgroundImage='url('+b64+')';};reader.readAsDataURL(f);};fileInp.click();});
    Q('.Qixian-jpyq-cover').addEventListener('click',function(){var fileInp=document.createElement('input');fileInp.type='file';fileInp.accept='image/*';fileInp.onchange=function(e){var f=e.target.files[0];if(!f)return;var reader=new FileReader();reader.onload=function(re){var b64=re.target.result;QxStore.set('Qx-pyq-cover',b64);Q('.Qixian-jpyq-cover').style.backgroundImage='url('+b64+')';};reader.readAsDataURL(f);};fileInp.click();});
    var savedPyqCover=QxStore.get('Qx-pyq-cover');if(savedPyqCover)Q('.Qixian-jpyq-cover').style.backgroundImage='url('+savedPyqCover+')';
    var savedPyqUav=QxStore.get('Qx-pyq-uav')||safeRAv;if(savedPyqUav)Q('.Qixian-jpyq-uav').style.backgroundImage='url('+savedPyqUav.replace(/'/g,'%27')+')';
    renderPyq();

    // init welcome
    renderSysMsg('Qixian 手机已连接 · '+finalLName);
}

/* ============ MAIN INIT & CHAR SWITCH ============ */
var currentCharName='';
function doInit(){
    var built=buildExtension();
    if(!built)return;
    var charInfo=getTavernChar();
    var userInfo=getTavernUser();
    currentCharName=charInfo.name;
    initPhone(built.panel,charInfo,userInfo);
    console.log('[Qixian Phone] 初始化完成，角色：'+charInfo.name);
}
function checkCharSwitch(){
    try{
        var charInfo=getTavernChar();
        if(charInfo.name&&charInfo.name!==currentCharName){
            console.log('[Qixian Phone] 检测到角色切换：'+currentCharName+' → '+charInfo.name);
            // reset: rebuild panel content
            var panel=document.getElementById(PANEL_ID);
            if(panel){
                panel.innerHTML=HTML;
                var userInfo=getTavernUser();
                currentCharName=charInfo.name;
                initPhone(panel,charInfo,userInfo);
            }
        }
    }catch(e){}
}

// wait for DOM ready
if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',doInit);
}else{
    doInit();
}
// poll for char switch every 2 seconds
setInterval(checkCharSwitch,2000);

})();
