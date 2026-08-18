/* Nico222 Phone - SillyTavern Extension v2.0 */
(function(){
'use strict';

var FLOAT_ID='nicole-float', CSS_ID='nicole-phone-styles', PANEL_ID='nicole-phone-panel', TOGGLE_ID='nicole-toggle-btn';

/* ============ CSS (scoped, no global pollution) ============ */
var CSS = `.Nicole-mu-inp-wrap,.Nicole-mu-ctrl,.Nicole-mu-time-disp,.Nicole-mu-now,.Nicole-mu-stage,.Nicole-mu-invbtn{flex-shrink:0!important;}

.Nicole-mu-list{display:flex;flex-direction:column;gap:6px;flex:1 1 auto;min-height:120px;max-height:240px!important;overflow-y:auto!important;padding-bottom:10px;scrollbar-width:none;-webkit-overflow-scrolling:touch;}

.Nicole-mu-list::-webkit-scrollbar{display:none;}

.Nicole-mu-item{display:flex;justify-content:space-between;align-items:center;padding:12px 14px;background:rgba(250,250,250,.85);border-radius:12px;font-size:12px;color:#444;cursor:pointer;transition:background .2s,transform .1s;border:1px solid rgba(0,0,0,.02);flex-shrink:0;}

.Nicole-mu-item:active{transform:scale(.98);background:rgba(240,240,240,.9);}

.Nicole-mu-item.active{background:#333!important;color:#fff!important;font-weight:600;}

.Nicole-mu-item.active .jmudel{color:rgba(255,255,255,.6)!important;}

.Nicole-home-screen{position:absolute;inset:0;background-color:#f2f2f7;background-image:url('https://tuchuang.org.cn/imgs/2026/07/10/cdf179abe6c5f102.png');background-size:cover;background-position:center;background-repeat:no-repeat;z-index:200;display:flex;flex-direction:column;transition:transform .35s cubic-bezier(.2,.8,.2,1);transform:translateX(-100%);border-radius:inherit;overflow:hidden;}

.Nicole-home-screen.active{transform:translateX(0);}

.Nicole-ios-statusbar{position:absolute;top:0;left:0;right:0;height:44px;display:flex;justify-content:space-between;align-items:center;padding:0 24px;font-size:14px;font-weight:600;color:var(--hdr-txt,#222);z-index:210;font-family:-apple-system,BlinkMacSystemFont,"Helvetica Neue",sans-serif;letter-spacing:.5px;text-shadow:0 1px 4px rgba(255,255,255,.6);}

.Nicole-ios-statusbar-right{display:flex;align-items:center;gap:6px;}

.Nicole-ios-statusbar-right svg{height:12px;fill:var(--hdr-txt,#222);filter:drop-shadow(0 1px 2px rgba(255,255,255,.5));}

.Nicole-ios-battery{width:22px;height:11px;border:1px solid var(--hdr-txt,rgba(0,0,0,.6));border-radius:4px;position:relative;padding:1px;display:flex;box-shadow:0 1px 2px rgba(255,255,255,.5);}

.Nicole-ios-battery::after{content:'';position:absolute;right:-4px;top:3px;width:2px;height:3px;background:var(--hdr-txt,rgba(0,0,0,.6));border-radius:0 2px 2px 0;}

.Nicole-ios-battery-level{background:var(--hdr-txt,#222);height:100%;width:85%;border-radius:1px;}

.Nicole-sticky-note{position:absolute;top:80px;left:50%;transform:translateX(-50%);width:80%;max-width:280px;background:rgba(255,255,255,.95);border-radius:4px;box-shadow:2px 6px 16px rgba(0,0,0,.06);padding:24px 16px 16px;display:flex;flex-direction:column;z-index:50;backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);}

.Nicole-sticky-tape{position:absolute;top:-14px;left:50%;transform:translateX(-50%) rotate(-3deg);width:110px;height:32px;background:rgba(255,255,255,.35);box-shadow:0 1px 3px rgba(0,0,0,.05);backdrop-filter:blur(3px);-webkit-backdrop-filter:blur(3px);border:1px solid rgba(255,255,255,.4);border-radius:2px;pointer-events:none;z-index:51;}

.Nicole-sticky-textarea{width:100%;min-height:140px;border:none;background:transparent;resize:none;outline:none;font-size:15px;color:#333;line-height:1.6;font-family:'Kaiti','Comic Sans MS',-apple-system,sans-serif;overflow-y:auto;scrollbar-width:none;font-weight:500;}

.Nicole-sticky-textarea::-webkit-scrollbar{display:none;}

.Nicole-sticky-btn{align-self:flex-end;margin-top:8px;background:#222;color:#fff;border:none;border-radius:14px;padding:6px 16px;font-size:12px;cursor:pointer;opacity:0;transition:opacity .3s,transform .1s;font-weight:500;}

.Nicole-sticky-note:focus-within .Nicole-sticky-btn{opacity:1;}

.Nicole-sticky-btn:active{transform:scale(.95);}

.Nicole-dock{position:absolute;bottom:24px;left:20px;right:20px;height:68px;background:rgba(255,255,255,.85);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border-radius:24px;display:flex;justify-content:space-evenly;align-items:center;padding:0 10px;box-shadow:0 4px 20px rgba(0,0,0,.04);border:1px solid rgba(0,0,0,.02);}

.Nicole-dock-icon{width:48px;height:48px;border-radius:14px;background:transparent;display:flex;justify-content:center;align-items:center;cursor:pointer;transition:transform .2s,background .2s;}

.Nicole-dock-icon:active{transform:scale(.9);background:rgba(0,0,0,.05);}

.Nicole-dock-icon svg{width:28px;height:28px;stroke:#222;stroke-width:1.5;fill:none;}

#app-wechat svg{width:25px;height:25px;}

.Nicole-hd-back{cursor:pointer;padding:4px;display:flex;align-items:center;color:var(--hdr-ic,#333);margin-right:4px;transition:opacity .2s;flex-shrink:0;}

.Nicole-hd-back:active{opacity:.6;}

.Nicole-hd-back svg{width:22px;height:22px;stroke:currentColor;fill:none;stroke-width:1.5;}

.Nicole-sys-app{position:absolute;inset:0;background:#fff;z-index:250;display:flex;flex-direction:column;transform:translateX(100%);transition:transform .3s;border-radius:inherit;}

.Nicole-sys-app.show{transform:translateX(0);}

.Nicole-sys-app-hd{padding:40px 16px 16px;background:rgba(255,255,255,.9);backdrop-filter:blur(10px);font-size:16px;font-weight:500;display:flex;align-items:center;gap:12px;border-bottom:.5px solid rgba(0,0,0,.05);z-index:10;}

.Nicole-sys-app-body{flex:1;overflow-y:auto;padding:0;scrollbar-width:none;display:flex;flex-direction:column;background:#fff;}

.Nicole-sys-app-body::-webkit-scrollbar{display:none;}

.Nicole-phone-app-container{display:flex;flex-direction:column;height:100%;width:100%;}

.Nicole-phone-content{flex:1;overflow-y:auto;scrollbar-width:none;background:#fff;padding-bottom:20px;}

.Nicole-phone-tabbar{display:flex;justify-content:space-around;padding:10px 0 20px;border-top:.5px solid rgba(0,0,0,.05);background:rgba(250,250,250,.95);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);}

.Nicole-ptab{font-size:10px;color:#888;cursor:pointer;transition:color .2s;display:flex;flex-direction:column;align-items:center;gap:4px;font-weight:500;}

.Nicole-ptab svg{width:22px;height:22px;stroke:currentColor;fill:none;stroke-width:1.5;}

.Nicole-ptab.active{color:#222;}

.Nicole-list-item{padding:14px 20px;border-bottom:.5px solid rgba(0,0,0,.03);display:flex;justify-content:space-between;align-items:center;cursor:pointer;background:#fff;transition:background .2s;}

.Nicole-list-item:active{background:#f9f9f9;}

.Nicole-item-title{font-size:15px;font-weight:500;color:#222;}

.Nicole-item-sub{font-size:12px;color:#888;margin-top:4px;}

.Nicole-item-arrow svg{width:16px;height:16px;stroke:#ccc;fill:none;stroke-width:1.5;}

.Nicole-contact-detail{padding:20px;display:flex;flex-direction:column;gap:20px;animation:Nicole-pop .3s forwards;}

.Nicole-c-av-wrap{display:flex;justify-content:center;margin-bottom:10px;}

.Nicole-c-av{width:80px;height:80px;border-radius:50%;background:#f0f0f0;display:flex;justify-content:center;align-items:center;font-size:32px;color:#888;font-weight:300;}

.Nicole-c-input-grp{display:flex;flex-direction:column;gap:6px;}

.Nicole-c-input-grp label{font-size:12px;color:#888;margin-left:4px;}

.Nicole-c-input{width:100%;border:none;border-bottom:1px solid rgba(0,0,0,.1);padding:12px 4px;font-size:16px;color:#222;outline:none;background:transparent;transition:border-color .3s;}

.Nicole-c-input:focus{border-bottom-color:#222;}

.Nicole-c-btns{display:flex;gap:12px;margin-top:10px;}

.Nicole-c-btn{flex:1;padding:14px;border-radius:12px;border:none;font-size:14px;font-weight:500;cursor:pointer;text-align:center;transition:transform .1s,opacity .2s;}

.Nicole-c-btn:active{transform:scale(.98);opacity:.8;}

.Nicole-c-btn.call{background:#333;color:#fff;}

.Nicole-c-btn.save{background:#f2f2f7;color:#222;}

.Nicole-dial-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px 24px;max-width:260px;margin:0 auto;padding-top:20px;}

.Nicole-dial-key{width:68px;height:68px;border-radius:50%;background:#f2f2f7;display:flex;flex-direction:column;justify-content:center;align-items:center;font-size:28px;font-weight:300;color:#222;cursor:pointer;transition:transform .1s,background .1s;border:1px solid rgba(0,0,0,.02);}

.Nicole-dial-key:active{transform:scale(.9);background:#e5e5ea;}

.Nicole-dial-callbtn{width:68px;height:68px;border-radius:50%;background:#34c759;display:flex;justify-content:center;align-items:center;cursor:pointer;margin:30px auto 0;transition:transform .1s;box-shadow:0 4px 12px rgba(52,199,89,.3);}

.Nicole-dial-callbtn:active{transform:scale(.9);}

.Nicole-dial-callbtn svg{width:30px;height:30px;stroke:#fff;stroke-width:1.5;fill:none;}


.Nicole-stage{width:90%;display:flex;justify-content:center;padding:10px 0;font-family:-apple-system,BlinkMacSystemFont,"Helvetica Neue",Arial,sans-serif;touch-action:pan-y;--wrap-bg:#e0e0e0;--hdr-bg:rgba(255,255,255,.85);--ftr-bg:rgba(255,255,255,.9);--bub-r:rgba(245,245,245,.9);--bub-l:rgba(255,255,255,.9);--txt-main:#222;--wv-bg:#aaa;--sys-txt:#888;--card-txt:#222;--hdr-txt:#333;--hdr-ic:#333;--card-ic:#333;--pull-bg:rgba(200,200,200,.3);--card-bg:rgba(255,255,255,.7);--call-bub-l:rgba(250,250,250,.9);--call-bub-r:rgba(240,240,240,.9);--call-bub-txt:#222;--blur-val:16px;}

input::-webkit-outer-spin-button,input::-webkit-inner-spin-button{-webkit-appearance:none;margin:0;}

input[type=number]{-moz-appearance:textfield;}

::-webkit-scrollbar{display:none;width:0;height:0;}

.Nicole-root.solid-mode{--blur-val:0px!important;}

.Nicole-root.solid-mode .Nicole-hd,.Nicole-root.solid-mode .Nicole-ft,.Nicole-root.solid-mode .Nicole-hd-pull{backdrop-filter:none!important;-webkit-backdrop-filter:none!important;}

.Nicole-root.av-sq .Nicole-uav,.Nicole-root.av-sq .Nicole-rav,.Nicole-root.av-sq .Nicole-lav,.Nicole-root.av-sq .Nicole-call-av,.Nicole-root.av-sq .Nicole-cp-face,.Nicole-root.av-sq .Nicole-pyq-iav,.Nicole-root.av-sq .Nicole-pyq-uav,.Nicole-root.av-sq .Nicole-mu-face,.Nicole-root.av-sq .Nicole-anchor-av{border-radius:10px!important;}

.Nicole-root.av-sq .Nicole-call.minimized:not(.video) .Nicole-call-av{border-radius:6px!important;}

.Nicole-phone-wrap{padding:6px;background:var(--wrap-bg);border-radius:42px;display:flex;justify-content:center;align-items:center;width:100%;max-width:360px;transition:background .3s;}

.Nicole-phone{width:100%;height:510px;background:#fdfdfd;border-radius:36px;position:relative;overflow:hidden;-webkit-mask-image:-webkit-radial-gradient(white,black);transform:translateZ(0);display:flex;flex-direction:column;box-sizing:border-box;}

.Nicole-bg{position:absolute;inset:-2px;z-index:0;background-size:cover;background-position:center;background-repeat:no-repeat;background-color:#f7f7f7;transition:background-image .3s;border-radius:inherit;}

.Nicole-content-layer{position:relative;z-index:1;display:flex;flex-direction:column;width:100%;height:100%;}

.Nicole-hd{position:absolute;top:0;left:0;right:0;padding:20px 14px 8px;display:flex;align-items:center;justify-content:space-between;background:var(--hdr-bg);backdrop-filter:blur(var(--blur-val));-webkit-backdrop-filter:blur(var(--blur-val));z-index:50;transition:transform .35s cubic-bezier(.2,.8,.2,1),background .3s;border-bottom:.5px solid rgba(0,0,0,.03);}

.Nicole-hd.collapsed{transform:translateY(-100%);}

.Nicole-notch{position:absolute;top:0;left:50%;transform:translateX(-50%);width:70px;height:16px;background:#222;border-radius:0 0 10px 10px;z-index:30;}

.Nicole-hd-pull{position:absolute;bottom:-16px;left:50%;transform:translateX(-50%);width:44px;height:16px;background:var(--pull-bg);backdrop-filter:blur(var(--blur-val));-webkit-backdrop-filter:blur(var(--blur-val));border-radius:0 0 14px 14px;display:flex;justify-content:center;align-items:center;cursor:pointer;z-index:100;color:var(--sys-txt);transition:all .3s;pointer-events:auto;}

.Nicole-hd.collapsed .Nicole-hd-pull svg{transform:rotate(180deg);}

.Nicole-hd-ph{width:4px;}

.Nicole-hd-mid{display:flex;align-items:center;gap:12px;flex:1;justify-content:flex-start;margin-left:2px;}

.Nicole-ubox{display:flex;flex-direction:column;align-items:center;gap:4px;width:56px;}

.Nicole-uav{width:32px;height:32px;aspect-ratio:1;border-radius:50%;background-size:cover;background-position:center;cursor:pointer;transition:border-radius .3s;border:.5px solid rgba(0,0,0,.05);}

.Nicole-uname{font-size:11px;font-weight:500;color:var(--hdr-txt,#222);width:100%;text-align:center;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;outline:none;cursor:text;padding:2px;border-radius:4px;transition:background .2s,color .3s;}

.Nicole-uname:focus{background:rgba(0,0,0,.05);}

.Nicole-waves{display:flex;align-items:center;gap:3px;height:20px;}

.Nicole-wave{width:2px;background:var(--wv-bg);border-radius:10px;opacity:.85;animation:Nicole-jp 1s ease-in-out infinite alternate;transition:background .3s;}

.Nicole-wave:nth-child(2){animation-delay:.3s} .Nicole-wave:nth-child(3){animation-delay:.15s} .Nicole-wave:nth-child(4){animation-delay:.5s} .Nicole-wave:nth-child(5){animation-delay:.25s} .Nicole-wave:nth-child(6){animation-delay:.4s}

@keyframes Nicole-jp{0%{height:4px}100%{height:16px}}

.Nicole-icons-rt{display:flex;gap:6px;align-items:center;}

.Nicole-icbtn{padding:4px;cursor:pointer;color:var(--hdr-ic,#333)!important;transition:opacity .2s;}

.Nicole-icbtn:active{opacity:.6;}

.Nicole-icbtn svg{width:20px;height:20px;fill:none!important;stroke:var(--hdr-ic,#333)!important;stroke-width:1.5;}

.Nicole-chat{flex:1;padding:14px;padding-top:76px;display:flex;flex-direction:column;gap:14px;overflow-y:auto;touch-action:pan-y;z-index:5;scrollbar-width:none;overscroll-behavior:contain;position:relative;transition:padding-top .35s cubic-bezier(.2,.8,.2,1);}

.Nicole-chat.collapsed{padding-top:26px;}

.Nicole-row{display:flex;gap:8px;max-width:95%;opacity:0;animation:Nicole-pop .4s forwards cubic-bezier(.2,.8,.2,1);position:relative;transition:transform .2s,filter .2s;}

@keyframes Nicole-pop{from{transform:translateY(6px);opacity:0;}to{transform:translateY(0);opacity:1;}}

.Nicole-row.left{align-self:flex-start;}

.Nicole-row.right{align-self:flex-end;flex-direction:row-reverse;}

.Nicole-rav,.Nicole-lav{width:32px;height:32px;border-radius:50%;background-size:cover;background-position:center;flex-shrink:0;user-select:none;transition:border-radius .3s;border:.5px solid rgba(0,0,0,.05);}

.Nicole-ct{display:flex;flex-direction:column;gap:4px;max-width:calc(100% - 40px);position:relative;}

.Nicole-row.right .Nicole-ct{align-items:flex-end;}

.Nicole-err-icon{display:none;width:18px;height:18px;border-radius:50%;border:1.5px solid #444;color:#444;background:rgba(255,255,255,.9);align-items:center;justify-content:center;font-size:13px;font-weight:bold;cursor:pointer;flex-shrink:0;align-self:center;}

.Nicole-row.has-err .Nicole-err-icon{display:flex;animation:Nicole-pop .3s forwards;}

.Nicole-sys-msg{width:100%;text-align:center;font-size:11px;color:var(--sys-txt);font-weight:400;opacity:0;animation:Nicole-pop .4s forwards;padding:4px 0;transition:color .3s;}

.Nicole-view-rev{color:#444;font-weight:500;cursor:pointer;margin-left:4px;border-bottom:.5px solid #444;}

.Nicole-sys-rej{color:var(--sys-txt);filter:brightness(.85);transition:color .3s;}

.Nicole-bub{padding:10px 14px;font-size:13px;line-height:1.5;color:var(--txt-main);word-wrap:break-word;word-break:break-all;white-space:pre-wrap;cursor:pointer;position:relative;backdrop-filter:blur(var(--blur-val));-webkit-backdrop-filter:blur(var(--blur-val));transition:background .3s,backdrop-filter .3s;font-weight:400;border:.5px solid rgba(0,0,0,.03);}

.Nicole-row.left .Nicole-bub{background:var(--bub-l);border-radius:4px 18px 18px 18px;}

.Nicole-row.right .Nicole-bub{background:var(--bub-r);border-radius:18px 4px 18px 18px;}

@keyframes Nc-poke{0%{transform:scale(1) rotate(0);}20%{transform:scale(1.1) rotate(-15deg) translateX(-4px);}40%{transform:scale(1.1) rotate(15deg) translateX(4px);}60%{transform:scale(1.1) rotate(-15deg) translateX(-4px);}80%{transform:scale(1.1) rotate(15deg) translateX(4px);}100%{transform:scale(1) rotate(0);}}

@keyframes Nc-dice{0%{transform:translateY(0) rotate(0);}25%{transform:translateY(-12px) rotate(90deg);}50%{transform:translateY(0) rotate(180deg);}75%{transform:translateY(-6px) rotate(270deg);}100%{transform:translateY(0) rotate(360deg);}}

@keyframes Nc-rps{0%{transform:scale(.3);opacity:0;}50%{transform:scale(1.2);opacity:1;}100%{transform:scale(1);opacity:1;}}

.Nicole-interact-item{display:flex;flex-direction:column;align-items:center;justify-content:center;padding:4px;background:transparent;border:none;box-shadow:none;color:#444;margin:4px 0;}

.Nicole-interact-item svg{width:44px;height:44px;stroke:currentColor;fill:none;stroke-width:1.5;}

.Nicole-anim-poke svg{animation:Nc-poke .6s ease-in-out;}

.Nicole-anim-dice svg{animation:Nc-dice .7s ease-in-out;}

.Nicole-anim-rps svg{animation:Nc-rps .5s cubic-bezier(.175,.885,.32,1.275);}

.Nicole-row.right .Nicole-interact-item{align-items:flex-end;}

.Nicole-row.left .Nicole-interact-item{align-items:flex-start;}

.Nicole-img{width:140px;max-width:100%;border-radius:14px;display:block;background:transparent;object-fit:cover;cursor:pointer;border:.5px solid rgba(0,0,0,.03);}

.Nicole-txt-img{display:flex!important;justify-content:center!important;align-items:center!important;width:150px!important;max-width:100%!important;aspect-ratio:1!important;background:linear-gradient(135deg,var(--bub-l),var(--bub-r))!important;backdrop-filter:blur(var(--blur-val))!important;-webkit-backdrop-filter:blur(var(--blur-val))!important;border-radius:18px!important;padding:14px!important;font-size:13px!important;font-weight:400!important;color:var(--txt-main)!important;text-align:center!important;word-wrap:break-word!important;white-space:pre-wrap!important;line-height:1.5!important;cursor:pointer!important;overflow:hidden!important;border:.5px solid rgba(0,0,0,.03)!important;box-shadow:none!important;transition:all .3s;}

.Nicole-txt-img:active{filter:brightness(.95);}

.Nicole-quote-box{position:relative;font-size:11px;color:inherit;opacity:.75;background:rgba(0,0,0,.02);padding:8px 12px;border-radius:10px;margin-bottom:8px;word-wrap:break-word;white-space:pre-wrap;display:block;width:100%;max-width:220px;box-sizing:border-box;overflow:hidden;}

.Nicole-row.right .Nicole-quote-box{background:rgba(0,0,0,.02);}

.Nicole-reply-bar{display:none;background:rgba(255,255,255,.85);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);border-radius:14px;padding:8px 14px;font-size:12px;color:#666;margin:10px 0 8px;justify-content:space-between;align-items:center;border:.5px solid rgba(0,0,0,.03);}

.Nicole-reply-bar.show{display:flex;}

.Nicole-reply-txt{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:85%;font-weight:400;}

.Nicole-reply-txt::before{content:'💬 引用：';color:#444;font-size:11px;margin-right:4px;font-weight:500;}

.Nicole-reply-close{cursor:pointer;font-weight:300;color:#888;padding:0 4px;font-size:18px;}

.Nicole-au{padding:10px 14px;cursor:pointer;overflow:hidden;transition:all .3s;backdrop-filter:blur(var(--blur-val));-webkit-backdrop-filter:blur(var(--blur-val));user-select:none;border:.5px solid rgba(0,0,0,.03);}

.Nicole-row.left .Nicole-au{background:var(--bub-l);border-radius:4px 18px 18px 18px;}

.Nicole-row.right .Nicole-au{background:var(--bub-r);border-radius:18px 4px 18px 18px;}

.Nicole-au-main{display:flex;align-items:center;gap:8px;width:130px;pointer-events:none;}

.Nicole-au-play{width:0;height:0;border-top:5px solid transparent;border-bottom:5px solid transparent;border-left:7px solid #888;transition:border-left-color .2s;}

.Nicole-au.playing .Nicole-au-play{border-left-color:#222;}

.Nicole-au-bars{flex:1;display:flex;align-items:center;gap:2px;height:10px;}

.Nicole-au-bars span{width:2px;height:100%;background:rgba(0,0,0,.1);border-radius:1px;transition:height .2s,background .2s;}

.Nicole-au-bars span:nth-child(even){height:60%} .Nicole-au-bars span:nth-child(3n){height:85%}

.Nicole-au.playing .Nicole-au-bars span{background:#222;animation:Nicole-bar-jump .4s infinite alternate;}

.Nicole-au.playing .Nicole-au-bars span:nth-child(2){animation-delay:.1s} .Nicole-au.playing .Nicole-au-bars span:nth-child(3){animation-delay:.2s} .Nicole-au.playing .Nicole-au-bars span:nth-child(4){animation-delay:.3s}

@keyframes Nicole-bar-jump{0%{transform:scaleY(.4);}100%{transform:scaleY(1.3);}}

.Nicole-au-dur{font-size:11px;font-weight:400;color:#666;pointer-events:none;}

.Nicole-au-wrap{display:grid;grid-template-rows:0fr;transition:grid-template-rows .35s;}

.Nicole-au.open .Nicole-au-wrap{grid-template-rows:1fr;}

.Nicole-au-txt{overflow:hidden;font-size:12px;color:var(--txt-main);word-wrap:break-word;white-space:pre-wrap;border-top:.5px solid transparent;transition:all .3s;opacity:.8;font-weight:300;}

.Nicole-au.open .Nicole-au-txt{border-top-color:rgba(0,0,0,.05);margin-top:8px;padding-top:8px;}

.Nicole-meta{display:flex;align-items:center;gap:4px;font-size:10px;color:#aaa;margin-top:2px;font-weight:300;}

.Nicole-tick{color:#aaa;font-size:11px;letter-spacing:-1.5px;font-weight:400;}

.Nicole-tf,.Nicole-link-card,.Nicole-gift-card,.Nicole-mu-invite-card,.Nicole-loc-card,.Nicole-food-card{background:var(--card-bg);backdrop-filter:blur(var(--blur-val));-webkit-backdrop-filter:blur(var(--blur-val));border-radius:16px;padding:14px;display:flex;align-items:center;gap:12px;width:210px;cursor:pointer;text-decoration:none;transition:filter .2s,opacity .2s,background .3s;border:.5px solid rgba(0,0,0,.03);}

.Nicole-tf-ic{width:34px;height:34px;background:rgba(0,0,0,.03);border-radius:50%;display:flex;justify-content:center;align-items:center;font-weight:400;font-size:15px;color:var(--card-ic,#222);flex-shrink:0;transition:all .3s;}

.Nicole-tf.got,.Nicole-tf.returned{opacity:.75;}

.Nicole-tf.got .Nicole-tf-ic,.Nicole-tf.returned .Nicole-tf-ic{background:rgba(0,0,0,.02);color:#888;}

.Nicole-link-ic,.Nicole-food-ic{width:36px;height:36px;background:transparent;border-radius:10px;display:flex;justify-content:center;align-items:center;flex-shrink:0;}

.Nicole-link-ic svg,.Nicole-food-ic svg{width:18px;height:18px;fill:none;stroke:var(--card-ic,#222);stroke-width:1.5px;transition:stroke .3s;}

.Nicole-tf-info{display:flex;flex-direction:column;gap:2px;flex:1;min-width:0;pointer-events:none;}

.Nicole-tf-t{font-size:13px;font-weight:500;color:var(--card-txt,var(--txt-main));white-space:nowrap;overflow:hidden;text-overflow:ellipsis;transition:color .3s;letter-spacing:.2px;}

.Nicole-tf-a{font-size:11px;color:var(--sys-txt);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-weight:300;}

.Nicole-tf-f{font-size:10px;color:var(--txt-main);opacity:.4;margin-top:4px;padding-top:4px;font-weight:300;}

.Nicole-cp-qacard{width:auto;max-width:240px;align-items:flex-start;flex-direction:column;gap:6px;background:var(--card-bg);backdrop-filter:blur(var(--blur-val));-webkit-backdrop-filter:blur(var(--blur-val));border-radius:18px;padding:16px;cursor:pointer;transition:filter .2s,background .3s;border:.5px solid rgba(0,0,0,.03);}

.Nicole-cp-qacard .Nicole-tf-t{font-size:11px;font-weight:500;color:var(--sys-txt);letter-spacing:.5px;width:100%;display:flex;align-items:center;gap:6px;text-transform:uppercase;}

.Nicole-cp-qatxt{font-size:13px;color:var(--txt-main);line-height:1.5;font-weight:400;width:100%;word-break:break-word;padding-top:4px;pointer-events:none;}

.Nicole-music-share-card{flex-direction:column;align-items:stretch;width:230px;padding:14px;gap:12px;border-radius:18px;}

.Nicole-msc-top{display:flex;align-items:center;gap:12px;}

.Nicole-msc-cover{width:46px;height:46px;border-radius:10px;background-size:cover;background-position:center;position:relative;flex-shrink:0;}

.Nicole-msc-playic{position:absolute;inset:0;background:rgba(0,0,0,.2);border-radius:10px;display:flex;justify-content:center;align-items:center;}

.Nicole-msc-playic svg{width:18px;height:18px;fill:rgba(255,255,255,.9);}

.Nicole-msc-info{display:flex;flex-direction:column;min-width:0;flex:1;}

.Nicole-msc-name{font-size:13px;font-weight:500;color:var(--txt-main);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;line-height:1.3;}

.Nicole-msc-artist{font-size:11px;color:var(--sys-txt);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin-top:2px;font-weight:300;}

.Nicole-msc-bot{padding-top:8px;display:flex;align-items:center;gap:6px;font-size:10px;color:#888;font-weight:400;}

.Nicole-msc-bot svg{width:14px;height:14px;stroke:#888;}


.Nicole-ft{background:var(--ftr-bg);backdrop-filter:blur(var(--blur-val));-webkit-backdrop-filter:blur(var(--blur-val));padding:0 14px 14px;display:flex;flex-direction:column;flex-shrink:0;z-index:10;transition:background .3s;border-top:.5px solid rgba(0,0,0,.03);}

.Nicole-in-area{display:flex;gap:8px;align-items:center;padding-top:10px;}

.Nicole-lang{width:34px;height:28px;font-size:11px;display:flex;justify-content:center;align-items:center;background:rgba(0,0,0,.03);border-radius:10px;cursor:pointer;color:#555;font-weight:500;flex-shrink:0;}

.Nicole-plus{width:28px;height:28px;display:flex;justify-content:center;align-items:center;cursor:pointer;transition:transform .3s;flex-shrink:0;}

.Nicole-plus svg{width:22px;height:22px;stroke:#444;stroke-width:1.5px;fill:none;}

.Nicole-plus.on{transform:rotate(45deg);}

.Nicole-input{flex:1;min-width:0;height:36px;border-radius:18px;background:rgba(240,240,240,.8)!important;padding:0 16px;font-size:13px;outline:none;border:none;color:#222;font-weight:400;}

.Nicole-mic,.Nicole-send{width:28px;height:28px;display:flex;justify-content:center;align-items:center;cursor:pointer;color:#444;flex-shrink:0;}

.Nicole-mic svg,.Nicole-send svg{width:18px;height:18px;fill:none;stroke:currentColor;stroke-width:1.5px;}

.Nicole-mic.rec{color:#222;animation:Nicole-pl 1s infinite alternate;}

.Nicole-panel{max-height:0;overflow:hidden;transition:max-height .3s ease;display:grid;grid-template-columns:repeat(4,1fr);gap:16px 6px;}

.Nicole-panel.show{max-height:280px;padding-top:16px;overflow-y:auto;scrollbar-width:none;}

.Nicole-pi{display:flex;flex-direction:column;align-items:center;gap:8px;cursor:pointer;position:relative;}

.Nicole-pic{width:46px;height:46px;background:rgba(0,0,0,.02);border-radius:14px;display:flex;justify-content:center;align-items:center;border:.5px solid rgba(0,0,0,.03);}

.Nicole-pic svg{width:22px;height:22px;fill:none;stroke:#333;stroke-width:1.2px;}

.Nicole-ptx{font-size:10px;color:#777;font-weight:400;text-align:center;white-space:nowrap;}

.Nicole-call{position:absolute;inset:0;background:#fdfdfd;z-index:9999;display:flex;flex-direction:column;opacity:0;pointer-events:none;transition:all .35s cubic-bezier(.2,.8,.2,1);border-radius:inherit;overflow:hidden;}

.Nicole-call.show{opacity:1;pointer-events:auto;}

.Nicole-call-vbg{position:absolute;inset:0;background-size:cover;background-position:center;background-image:url('');filter:blur(20px) brightness(.9) grayscale(.2);opacity:0;transition:all .3s;z-index:1;}

.Nicole-call:not(.video) .Nicole-call-vbg{opacity:1;}

.Nicole-call.video .Nicole-call-vbg{opacity:1;filter:blur(10px) brightness(.9) grayscale(.2);}

.Nicole-call-pip{position:absolute;top:30px;right:16px;width:70px;height:100px;background-size:cover;border-radius:12px;z-index:20;opacity:0;transition:opacity .3s;border:.5px solid rgba(255,255,255,.2);}

.Nicole-call.video .Nicole-call-pip{opacity:1;}

.Nicole-call-mini-top{position:absolute;top:20px;left:16px;z-index:60;cursor:pointer;color:#333;padding:4px;display:flex;align-items:center;justify-content:center;transition:color .2s,transform .2s;}

.Nicole-call.video .Nicole-call-mini-top{color:rgba(255,255,255,.9);}

.Nicole-call-mini-top:active{transform:scale(.85);}

.Nicole-call-mini-top svg{width:24px;height:24px;stroke:currentColor;stroke-width:1.5;fill:none;}

.Nicole-call.minimized .Nicole-call-mini-top{display:none;}

.Nicole-call-ct{position:relative;z-index:10;display:flex;flex-direction:column;height:100%;padding:10px 16px 16px;transition:padding .3s;}

.Nicole-call-avs{display:flex;justify-content:center;align-items:center;margin-bottom:12px;transition:transform .4s cubic-bezier(.2,.8,.2,1);}

.Nicole-call.active .Nicole-call-avs{transform:scale(.85) translateY(-10px);}

.Nicole-call-av{width:84px;height:84px;border-radius:50%;background-size:cover;position:relative;transition:border-radius .3s,width .4s,height .4s;border:.5px solid rgba(0,0,0,.05);}

.Nicole-jcall-lav{z-index:1;}

.Nicole-jcall-rav{margin-left:-20px;z-index:2;}

.Nicole-call.active .Nicole-call-av{width:64px;height:64px;}

.Nicole-call.video .Nicole-call-avs{transform:scale(0);height:0;margin:0;opacity:0;display:none;}

.Nicole-call-nm{text-align:center;font-size:20px;font-weight:500;color:#222;z-index:10;letter-spacing:.5px;transition:font-size .4s;margin-bottom:6px;}

.Nicole-call.active .Nicole-call-nm{font-size:16px;margin-bottom:0px;}

.Nicole-call.video .Nicole-call-nm{color:#fff!important;font-weight:500;text-shadow:0 1px 4px rgba(0,0,0,.3);}

.Nicole-call-st{text-align:center;font-size:12px;color:#888;margin-bottom:8px;z-index:10;font-weight:300;transition:all .3s;}

.Nicole-call.active .Nicole-call-st{display:none;}

.Nicole-call.video .Nicole-call-st{color:rgba(255,255,255,.8)!important;font-weight:400;text-shadow:0 1px 3px rgba(0,0,0,.3);}

.Nicole-call-timer{text-align:center;font-size:10px;color:#555;font-family:-apple-system,sans-serif;font-weight:400;margin-bottom:8px;z-index:10;display:none;transition:opacity .3s;}

.Nicole-call.active .Nicole-call-timer{display:block;opacity:1;}

.Nicole-call.video .Nicole-call-timer{color:#fff!important;text-shadow:0 1px 3px rgba(0,0,0,.3);}

.Nicole-call-bubs{flex:1;display:flex;flex-direction:column;justify-content:flex-start;gap:8px;margin-bottom:16px;overflow-y:auto;z-index:10;padding:0 4px;scrollbar-width:none;opacity:0;transition:opacity .3s;touch-action:pan-y;-webkit-overflow-scrolling:touch;}

.Nicole-call-bubs::before{content:"";flex:1 1 auto;min-height:0;}

.Nicole-call.active .Nicole-call-bubs{opacity:1;}

.Nicole-cb-wrap{display:flex;flex-direction:column;}

.Nicole-cb-wrap.left{align-items:flex-start;} .Nicole-cb-wrap.right{align-items:flex-end;}

.Nicole-cb{background:var(--call-bub-l,rgba(250,250,250,.9));backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);color:var(--call-bub-txt,#222);padding:10px 14px;border-radius:16px;font-size:13px;max-width:85%;animation:Nicole-pop .3s forwards cubic-bezier(.2,.8,.2,1);font-weight:400;border:.5px solid rgba(0,0,0,.03);}


.Nicole-cb-wrap.right .Nicole-cb{background:var(--call-bub-r,rgba(240,240,240,.9));}

.Nicole-call.video .Nicole-cb{color:var(--call-bub-txt,#222)!important;text-shadow:none;}

.Nicole-call .Nicole-call-ft {

    display: flex !important;

    flex-direction: column;

    gap: 20px;

    z-index: 99999 !important;

    padding-bottom: 10px;

}

.Nicole-call-btns {

    display: none !important;

    justify-content: space-evenly !important;

    padding: 0 30px !important;

    animation: Nicole-pop .3s !important;

}

.Nicole-call.state-out .btns-out {

    display: flex !important;

}

.Nicole-call.state-in .btns-in {

    display: flex !important;

}

.Nicole-call-btn {

    width: 64px !important;

    height: 64px !important;

    border-radius: 50% !important;

    display: flex !important;

    justify-content: center !important;

    align-items: center !important;

    cursor: pointer !important;

    transition: transform .1s, background .2s !important;

}

.Nicole-call-btn:active {

    transform: scale(.92) !important;

}

.Nicole-call-btn.hangup {

    background: #ffffff !important;

    color: #222222 !important;

    box-shadow: 0 2px 8px rgba(0,0,0,.15) !important;

    border: 1px solid rgba(0,0,0,.1) !important;

}

.Nicole-call-btn.answer {

    background: #ffffff !important;

    color: #222222 !important;

    box-shadow: 0 2px 8px rgba(0,0,0,.15) !important;

    border: 1px solid rgba(0,0,0,.1) !important;

}

.Nicole-call-btn.cancel {

    background: #f5f5f5 !important;

    color: #666666 !important;

    box-shadow: 0 2px 8px rgba(0,0,0,.1) !important;

    border: 1px solid rgba(0,0,0,.08) !important;

}

.Nicole-call-btn svg {

    width: 28px !important;

    height: 28px !important;

    stroke: currentColor !important;

    stroke-width: 1.8 !important;

    fill: none !important;

}

.Nicole-call-inrow {

    display: none !important;

    gap: 10px;

    align-items: center;

    background: rgba(250, 250, 250, 0.9) !important;

    backdrop-filter: blur(10px);

    padding: 6px 8px !important;

    height: 36px !important;

    border-radius: 22px;

    animation: Nicole-pop .3s;

    border: .5px solid rgba(0, 0, 0, .03);

    z-index: 99999 !important;

}

.Nicole-call.active .Nicole-call-inrow {

    display: flex !important;

}

.Nicole-call-in {

    flex: 1;

    border: none;

    background: transparent;

    padding: 0 8px !important;

    height: 24px !important;

    font-size: 12px !important;

    outline: none;

    color: #222;

    min-width: 0;

    font-weight: 400;

}

.Nicole-call.active .Nicole-call-btn.mini {

    width: 28px !important;

    height: 28px !important;

    flex-shrink: 0;

    box-shadow: none !important;

}

.Nicole-call.active .Nicole-call-btn.mini svg {

    width: 16px !important;

    height: 16px !important;

}

.Nicole-call.active .Nicole-call-send {

    height: 24px !important;

    padding: 0 12px !important;

    font-size: 11px !important;

    background: #222;

    color: #fff;

    border-radius: 16px;

    font-weight: 500;

    cursor: pointer;

    transition: background .2s;

    border: none;

}

.Nicole-call.minimized{cursor:grab;}

.Nicole-call.minimized:active{cursor:grabbing;}

.Nicole-call.minimized.video{top:16px;right:16px;bottom:auto;left:auto;width:84px;height:134px;border-radius:14px;padding:0;background:#000;overflow:hidden;}

.Nicole-call.minimized.video .Nicole-call-vbg{display:block!important;opacity:1!important;filter:none!important;z-index:1;}

.Nicole-call.minimized.video .Nicole-call-pip{display:block!important;opacity:1!important;width:26px;height:38px;top:6px;right:6px;border-radius:6px;z-index:25;border:none;}

.Nicole-call.minimized.video .Nicole-call-ct{display:flex!important;flex-direction:column;justify-content:flex-end;align-items:center;padding:8px!important;z-index:10;background:linear-gradient(to top,rgba(0,0,0,.5),transparent 60%);height:100%;}

.Nicole-call.minimized.video .Nicole-call-avs,.Nicole-call.minimized.video .Nicole-call-nm,.Nicole-call.minimized.video .Nicole-call-st,.Nicole-call.minimized.video .Nicole-call-bubs,.Nicole-call.minimized.video .Nicole-call-ft{display:none!important;}

.Nicole-call.minimized.video .Nicole-call-timer{display:block!important;margin:0;padding:0;font-size:11px;color:#fff!important;font-weight:400;text-shadow:0 1px 4px rgba(0,0,0,.5);letter-spacing:.5px;opacity:1;}

.Nicole-call.minimized:not(.video){top:60px;right:16px;bottom:auto;left:auto;width:auto;min-width:104px;height:42px;border-radius:21px;background:rgba(250,250,250,.95);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);padding:0 16px;display:flex;flex-direction:row;justify-content:center;align-items:center;overflow:visible;border:.5px solid rgba(0,0,0,.05);}

.Nicole-call.minimized:not(.video) .Nicole-call-vbg{display:none;}

.Nicole-call.minimized:not(.video) .Nicole-call-ct{padding:0;flex-direction:row;justify-content:space-between;align-items:center;width:100%;gap:10px;}

.Nicole-call.minimized:not(.video) .Nicole-call-avs{margin:0;transform:none;display:flex!important;opacity:1!important;height:auto;pointer-events:none;}

.Nicole-call.minimized:not(.video) .Nicole-call-av{width:24px;height:24px;}

.Nicole-call.minimized:not(.video) .Nicole-jcall-rav{margin-left:-10px;z-index:2;}

.Nicole-call.minimized:not(.video) .Nicole-call-nm,.Nicole-call.minimized:not(.video) .Nicole-call-st{display:none;}

.Nicole-call.minimized:not(.video) .Nicole-call-timer{display:block!important;font-size:13px;font-weight:500;color:#222!important;margin:0;text-shadow:none;pointer-events:none;letter-spacing:.5px;opacity:1;}

.Nicole-call.minimized .Nicole-call-bubs,.Nicole-call.minimized .Nicole-call-ft,.Nicole-call.minimized:not(.video) .Nicole-call-pip{display:none!important;}

.Nicole-call-mini-hint{display:none;position:absolute;inset:0;z-index:50;}

.Nicole-call.minimized .Nicole-call-mini-hint{display:block;}

.Nicole-set{position:absolute;inset:0;background:#ffffff;z-index:9999;display:flex;flex-direction:column;transform:translateX(100%);transition:transform .3s;padding:24px;overflow-y:auto;scrollbar-width:none;}

.Nicole-set.show{transform:translateX(0);}
.nc-inline-row{margin:6px 0;animation:nc-inline-pop .3s ease-out;clear:both!important;box-sizing:border-box;}
.nc-inline-row.nc-left{max-width:75%;display:grid;grid-template-columns:auto 1fr;gap:8px;align-items:start;margin-left:6px;}
.nc-inline-row.nc-right{max-width:75%;margin-left:auto;display:grid;grid-template-columns:1fr auto;gap:8px;justify-items:end;text-align:right;align-items:start;margin-right:6px;}
.nc-inline-av-wrap{display:flex;flex-direction:column;align-items:center;gap:3px;flex-shrink:0;}
.nc-inline-av{width:36px;height:36px;border-radius:50%;background-size:cover;background-position:center;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:600;}.nc-inline-av.nc-av-char{background:#2c2c2c;color:#fff;border:1px solid #1a1a1a;}.nc-inline-av.nc-av-user{background:#e8e8e8;color:#333;border:1px solid #d0d0d0;}
.nc-inline-content{display:flex;flex-direction:column;gap:2px;min-width:0;max-width:100%;}
.nc-inline-row.nc-right .nc-inline-content{align-items:flex-end;}
.nc-inline-row.nc-left .nc-inline-content{align-items:flex-start;}
.nc-inline-name{font-size:11px;color:#999;white-space:nowrap;max-width:120px;overflow:hidden;text-overflow:ellipsis;margin:0 2px;line-height:1.2;}
.nc-inline-bub{padding:9px 14px;border-radius:14px;font-size:14px;line-height:1.55;word-break:break-word;width:-moz-fit-content;width:fit-content;max-width:100%;position:relative;box-shadow:0 1px 2px rgba(0,0,0,.06);text-align:left;}
.nc-inline-call{min-width:120px;}
.nc-inline-voice{display:flex;align-items:center;gap:8px;min-width:80px;}
.nc-inline-voice-bars{display:flex;align-items:center;gap:2px;height:16px;}
.nc-inline-voice-bars span{width:3px;background:currentColor;opacity:.6;border-radius:2px;}
.nc-inline-voice-dur{font-size:12px;color:#222;opacity:1;}
.nc-inline-card{display:flex;align-items:center;gap:10px;}
.nc-inline-card-ic{width:36px;height:36px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:16px;flex-shrink:0;}
.nc-inline-card-tx{font-size:13px;font-weight:600;}
.nc-inline-card-sub{font-size:11px;opacity:.6;margin-top:2px;}
.nc-inline-img{max-width:180px;border-radius:10px;display:block;}
@keyframes nc-inline-pop{from{opacity:0;transform:translateY(8px);}to{opacity:1;transform:translateY(0);}}
.Nicole-chatlist-screen{position:absolute;inset:0;background:#f5f5f5;z-index:300;display:none;flex-direction:column;border-radius:inherit;overflow:hidden;}
.Nicole-chatlist-screen.show{display:flex;}
.Nicole-chatlist-hd{display:flex;align-items:center;padding:14px 16px;background:#fff;border-bottom:1px solid #eee;font-size:16px;font-weight:600;}
.Nicole-chatlist-hd .back{cursor:pointer;margin-right:12px;display:flex;}
.Nicole-chatlist-hd .add{cursor:pointer;margin-left:auto;display:flex;}
.Nicole-chatlist-body{flex:1;overflow-y:auto;}
.Nicole-chatlist-item{position:relative;overflow:hidden;cursor:pointer;border-bottom:1px solid #eee;background:#fff;}
.Nicole-chatlist-inner{display:flex;align-items:center;padding:12px 16px;background:#fff;position:relative;z-index:2;transition:transform .3s cubic-bezier(.2,.8,.2,1);}
.Nicole-chatlist-del{position:absolute;right:0;top:0;bottom:0;width:70px;background:#ff3b30;color:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;cursor:pointer;z-index:1;}
.Nicole-chatlist-del svg{width:20px;height:20px;}
.Nicole-chatlist-del span{font-size:11px;font-weight:500;}
.Nicole-chatlist-item:active{background:#f0f0f0;}
.Nicole-chatlist-av{width:46px;height:46px;border-radius:50%;background:#ddd;background-size:cover;background-position:center;display:flex;align-items:center;justify-content:center;font-size:18px;font-weight:600;color:#fff;margin-right:12px;flex-shrink:0;}
.Nicole-chatlist-info{flex:1;min-width:0;}
.Nicole-chatlist-name{font-size:15px;font-weight:500;color:#222;margin-bottom:3px;}
.Nicole-chatlist-msg{font-size:12px;color:#999;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.Nicole-chatlist-item{position:relative;overflow:hidden;}
.Nicole-chatlist-inner{display:flex;align-items:center;padding:12px 16px;transition:transform .3s cubic-bezier(.2,.8,.2,1);background:var(--card-bg);position:relative;z-index:2;}
.Nicole-chatlist-del{position:absolute;right:0;top:0;bottom:0;width:70px;background:linear-gradient(135deg,#ff6b6b,#ee5a5a);color:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;cursor:pointer;z-index:1;opacity:.9;}
.Nicole-chatlist-del svg{width:20px;height:20px;}
.Nicole-chatlist-del span{font-size:11px;font-weight:500;}
.Nicole-chatlist-add{display:flex;align-items:center;justify-content:center;padding:20px;color:#999;font-size:13px;cursor:pointer;}
.Nicole-addchar-modal{position:absolute;inset:0;background:rgba(0,0,0,.5);z-index:400;display:none;align-items:center;justify-content:center;}
.Nicole-addchar-modal.show{display:flex;}
.Nicole-addchar-box{background:#fff;border-radius:14px;padding:20px;width:80%;max-width:280px;}
.Nicole-addchar-box h4{margin:0 0 12px 0;font-size:15px;text-align:center;}
.Nicole-addchar-box input{width:100%;padding:10px;border:1px solid #ddd;border-radius:8px;font-size:14px;box-sizing:border-box;margin-bottom:12px;}
.Nicole-addchar-btns{display:flex;gap:10px;}
.Nicole-addchar-btns button{flex:1;padding:10px;border:none;border-radius:8px;font-size:14px;cursor:pointer;}
.Nicole-addchar-btns .cancel{background:#f0f0f0;color:#666;}
.Nicole-addchar-btns .ok{background:#07c160;color:#fff;}

.Nicole-set-h{font-size:18px;font-weight:500;margin-bottom:16px;display:flex;justify-content:space-between;align-items:center;color:#222;}

.Nicole-set-x{font-size:24px;cursor:pointer;color:#888;width:32px;height:32px;display:flex;justify-content:center;align-items:center;background:rgba(0,0,0,.03);border-radius:50%;font-weight:300;}

.Nicole-set-r{display:flex;justify-content:space-between;align-items:center;padding:14px 0;border-bottom:.5px solid rgba(0,0,0,.03);font-size:13px;color:#555;font-weight:400;}

.Nicole-color-wrap{display:flex;align-items:center;gap:8px;}

.Nicole-hex-in{width:70px;height:30px;border:none;border-radius:8px;padding:0 6px;font-size:11px;font-family:monospace;outline:none;background:rgba(0,0,0,.03);color:#222;text-align:center;}

.Nicole-color-wrap input[type=color]{border:none;width:30px;height:30px;border-radius:8px;cursor:pointer;background:none;padding:0;}

.Nicole-bg-btn{padding:6px 12px;height:30px;border-radius:8px;border:none;background:#f2f2f7;cursor:pointer;font-size:12px;color:#333;outline:none;font-weight:500;transition:background .2s,color .2s;}

.Nicole-bg-btn.active{background:#222;color:#fff;}

.Nicole-mf{position:absolute;inset:0;background:rgba(0,0,0,.15);z-index:50;display:flex;flex-direction:column;justify-content:flex-end;opacity:0;pointer-events:none;transition:opacity .3s;backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);}

.Nicole-mf.show{opacity:1;pointer-events:auto;}

.Nicole-mbox{background:rgba(255,255,255,.98);height:75%;border-radius:28px 28px 0 0;display:flex;flex-direction:column;transform:translateY(100%);transition:transform .3s;}

.Nicole-mf.show .Nicole-mbox{transform:translateY(0);}

.Nicole-mh{display:flex;justify-content:space-between;align-items:center;padding:20px 24px 14px;font-weight:500;font-size:15px;color:#222;}

.Nicole-mc{width:28px;height:28px;background:rgba(0,0,0,.03);border-radius:50%;display:flex;justify-content:center;align-items:center;cursor:pointer;color:#888;font-weight:300;}

.Nicole-act-btn{padding:18px;text-align:center;font-size:15px;font-weight:400;color:#222;cursor:pointer;}

.Nicole-act-space{height:8px;background:rgba(0,0,0,.02);}

.Nicole-act-btn:active{background:rgba(0,0,0,.03);}

.Nicole-cen{position:absolute;inset:0;background:rgba(0,0,0,.25);z-index:999;display:none;justify-content:center;align-items:center;opacity:0;transition:opacity .3s;backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);}

.Nicole-cen.show{display:flex;opacity:1;}

.Nicole-cen-box{background:rgba(250,250,250,.98);width:260px;border-radius:20px;padding:24px;display:flex;flex-direction:column;gap:16px;transform:translateY(20px);transition:transform .3s;}

.Nicole-cen.show .Nicole-cen-box{transform:translateY(0);}

.Nicole-cen-box h4{text-align:center;font-size:15px;font-weight:500;color:#222;}

.Nicole-tf-grp{display:flex;align-items:baseline;border-bottom:1.5px solid rgba(0,0,0,.1);padding-bottom:6px;gap:8px;}

.Nicole-tf-grp input{border:none;font-size:26px;font-weight:400;width:100%;outline:none;background:transparent;color:#222;}

.Nicole-cen-inp,.Nicole-cen-box textarea{border:none;background:rgba(0,0,0,.03);padding:12px;border-radius:10px;font-size:13px;outline:none;resize:none;color:#222;width:100%;font-weight:400;}

.Nicole-cen-btns{display:flex;gap:12px;}

.Nicole-cen-btns button{flex:1;padding:12px;border-radius:12px;border:none;font-size:13px;font-weight:500;cursor:pointer;}

.Nicole-cen-btns .cc{background:rgba(0,0,0,.04);color:#55;} .Nicole-cen-btns .ok{background:#222;color:#fff;}

.Nicole-cen.w260 .Nicole-cen-box{width:280px;gap:12px;}

.Nicole-draw-canvas{border-radius:14px;background:#fff;touch-action:none;cursor:crosshair;display:block;margin:0 auto;border:.5px solid rgba(0,0,0,.03);}

.Nicole-draw-tools{display:flex;align-items:center;justify-content:space-between;gap:8px;width:100%;margin:6px 0;background:rgba(0,0,0,.02);padding:8px 10px;border-radius:14px;}

.Nicole-draw-color{width:26px;height:26px;border-radius:8px;cursor:pointer;padding:0;background:transparent;flex-shrink:0;border:none;}

.Nicole-draw-range{flex:1;accent-color:#222;height:4px;}

.Nicole-draw-btn-icon{width:28px;height:28px;border-radius:8px;background:rgba(0,0,0,.03);display:flex;justify-content:center;align-items:center;cursor:pointer;color:#444;flex-shrink:0;transition:transform .1s,background .2s;}

.Nicole-draw-btn-icon:active{transform:scale(.9);}

.Nicole-draw-btn-icon svg{stroke:currentColor;fill:none;width:16px;height:16px;stroke-width:1.5;}

.Nicole-txt-zoom{position:absolute;inset:0;background:rgba(250,250,250,.9);z-index:1000;display:none;justify-content:center;align-items:center;opacity:0;transition:opacity .3s;backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);padding:20px;cursor:zoom-out;}

.Nicole-txt-zoom.show{display:flex;opacity:1;align-items:center;}

.Nicole-txt-zoom-in{width:100%;max-width:300px;max-height:80vh;overflow-y:auto;scrollbar-width:none;background:#fff;border-radius:20px!important;padding:28px;font-size:16px;color:#222;display:flex;flex-direction:column;align-items:center;justify-content:flex-start;text-align:center;word-wrap:break-word;white-space:pre-wrap;font-weight:400;cursor:default;box-shadow:0 8px 30px rgba(0,0,0,.05);border:.5px solid rgba(0,0,0,.02);}

.Nicole-txt-zoom-in.txt-img-zoom{border:none!important;background:linear-gradient(135deg,var(--bub-l),var(--bub-r))!important;aspect-ratio:1;justify-content:center;border-radius:20px!important;padding:16px!important;}

.Nicole-txt-zoom-in.gift-zoom{justify-content:center;}

.Nicole-loc-wrap{flex:1;display:flex;flex-direction:column;align-items:center;position:relative;background:#fdfdfd;background-image:radial-gradient(rgba(0,0,0,.05) 1px,transparent 1px);background-size:20px 20px;border-radius:0 0 28px 28px;overflow:hidden;padding:24px 0;}

.Nicole-loc-dist{font-size:13px;color:#222;font-weight:500;margin-top:6px;padding:6px 14px;background:rgba(0,0,0,.03);border-radius:14px;}

.Nicole-radar{width:280px;height:280px;position:relative;margin:30px auto;display:flex;justify-content:center;align-items:center;}

.Nicole-radar-wave{position:absolute;width:100%;height:100%;border-radius:50%;background:radial-gradient(circle,rgba(0,0,0,.06) 0%,rgba(0,0,0,.02) 60%,transparent 80%);animation:Nicole-radar-pulse 3s ease-out infinite;opacity:0;}

.Nicole-radar-wave.w2{animation-delay:1.5s;width:80%;height:80%;}

.Nicole-anchor{position:absolute;display:flex;flex-direction:column;align-items:center;cursor:pointer;transition:transform .2s cubic-bezier(.2,.8,.2,1);z-index:5;}

.Nicole-anchor:active{transform:scale(1.08);}

.Nicole-anchor.a1{top:25%;left:15%;}

.Nicole-anchor.a2{bottom:20%;right:15%;}

.Nicole-anchor-av{width:46px;height:46px;border-radius:50%;background-size:cover;position:relative;z-index:2;transition:border-radius .3s;border:1px solid rgba(255,255,255,.8);box-shadow:0 4px 10px rgba(0,0,0,.05);}

.Nicole-anchor-tip{position:absolute;top:-38px;background:rgba(255,255,255,.95);backdrop-filter:blur(16px);padding:8px 14px;border-radius:16px;font-size:12px;color:#222;font-weight:500;white-space:nowrap;opacity:0;pointer-events:none;transition:all .2s;z-index:10;transform:translateY(4px);box-shadow:0 2px 8px rgba(0,0,0,.05);border:.5px solid rgba(0,0,0,.02);}

.Nicole-anchor:hover .Nicole-anchor-tip{opacity:1;transform:translateY(0);}

.Nicole-loc-send{margin-top:auto;background:#222;color:#fff;border-radius:18px;padding:14px 36px;font-size:14px;font-weight:500;cursor:pointer;border:none;}

.Nicole-mu,.Nicole-cp,.Nicole-emo{flex:1;display:flex;flex-direction:column;padding:20px;gap:20px;overflow-y:auto;scrollbar-width:none;}

.Nicole-mu-stage{display:flex;justify-content:center;align-items:center;gap:16px;}

.Nicole-mu-face{width:64px;height:64px;border-radius:50%;background-size:cover;transition:border-radius .3s;border:.5px solid rgba(0,0,0,.05);}

.Nicole-mu-waves{display:flex;align-items:center;justify-content:center;gap:6px;height:36px;width:48px;}

.Nicole-mu-waves .Nicole-wave{background:rgba(0,0,0,.1);width:3px;height:4px;border-radius:2px;transition:height .3s;}

.Nicole-mu-waves.playing .Nicole-wave{background:#222;animation:Nicole-jp 1s ease-in-out infinite alternate;}

.Nicole-mu-waves.playing .Nicole-wave:nth-child(2){animation-delay:.3s}

.Nicole-mu-waves.playing .Nicole-wave:nth-child(3){animation-delay:.15s}

.Nicole-mu-time-disp{text-align:center;font-size:12px;color:#555;font-weight:500;background:rgba(0,0,0,.02);padding:6px 14px;border-radius:16px;margin:0 auto;border:.5px solid rgba(0,0,0,.02);}

.Nicole-mu-ctrl{display:flex;justify-content:center;align-items:center;gap:28px;margin-top:12px;}

.Nicole-mu-btn{width:48px;height:48px;border-radius:50%;background:transparent;display:flex;justify-content:center;align-items:center;cursor:pointer;border:none;transition:transform .2s;}

.Nicole-mu-btn:active{transform:scale(.9);}

.Nicole-mu-btn svg{width:26px;height:26px;stroke:#222;fill:none;stroke-width:1.2;}

.Nicole-mu-btn.main svg{width:34px;height:34px;fill:#222;stroke:none;}

.Nicole-mu-inp-wrap{display:flex;gap:10px;}

.Nicole-mu-inp,.Nicole-mu-name,.Nicole-mu-artist,.Nicole-mu-cover{flex:1;border-radius:12px;padding:12px 14px;font-size:13px;background:rgba(0,0,0,.02);outline:none;border:none;color:#222;font-weight:400;}

.Nicole-mu-add{padding:0 16px;border:none;border-radius:12px;background:#222;color:#fff;font-size:13px;font-weight:500;}

.Nicole-mu-invbtn{margin-top:auto;padding:14px;border-radius:16px;background:rgba(0,0,0,.03);color:#222;font-size:14px;font-weight:500;cursor:pointer;border:none;}

.Nicole-emo-games{display:flex;gap:10px;padding:12px 20px;flex-shrink:0;align-items:center;}

.Nicole-emo-gamebtn{flex:1;display:flex;align-items:center;justify-content:center;gap:8px;background:rgba(0,0,0,.02);border-radius:14px;padding:10px 0;font-size:13px;color:#222;font-weight:500;cursor:pointer;transition:transform .1s,background .2s;border:.5px solid rgba(0,0,0,.02);}

.Nicole-emo-gamebtn:active{transform:scale(.95);background:rgba(0,0,0,.05);}

.Nicole-emo-gamebtn svg{width:18px;height:18px;stroke:currentColor;fill:none;stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round;}

.Nicole-emo-addbtn{width:36px;height:36px;flex-shrink:0;display:flex;justify-content:center;align-items:center;background:rgba(0,0,0,.02);border-radius:12px;cursor:pointer;transition:transform .1s,background .2s;border:.5px solid rgba(0,0,0,.02);}

.Nicole-emo-addbtn:active{transform:scale(.9);background:rgba(0,0,0,.06);}

.Nicole-emo-addbtn svg{width:18px;height:18px;stroke:#222;stroke-width:1.5;fill:none;}

.Nicole-emo{display:grid;grid-template-columns:repeat(2,1fr);align-content:start;gap:12px;padding-top:12px;}

.Nicole-emo-card{background:rgba(0,0,0,.02);border-radius:16px;padding:8px;display:flex;flex-direction:column;align-items:center;gap:8px;cursor:pointer;transition:transform .1s;border:.5px solid rgba(0,0,0,.02);}

.Nicole-emo-img{width:100%;aspect-ratio:1;object-fit:cover;border-radius:10px;pointer-events:none;border:none;}

.Nicole-emo-t{font-size:11px;color:#555;text-align:center;font-weight:400;}

.Nicole-cp-top{display:flex;flex-direction:column;align-items:center;gap:10px;}

.Nicole-cp-avs{display:flex;justify-content:center;align-items:center;}

.Nicole-cp-face{width:64px;height:64px;border-radius:50%;background-size:cover;transition:border-radius .3s;border:.5px solid rgba(0,0,0,.05);}

.Nicole-cp-face.Nicole-jcpf2{margin-left:-20px;position:relative;z-index:2;}

.Nicole-cp-id-group{font-size:14px;font-weight:500;color:#222;letter-spacing:.2px;display:flex;align-items:center;gap:8px;}

.Nicole-cp-rel{text-align:center;font-size:12px;color:#555;background:rgba(0,0,0,.02);border-radius:14px;padding:8px 16px;}

.Nicole-cp-sec{background:rgba(0,0,0,.02);border-radius:20px;padding:16px;transition:background .3s;border:.5px solid rgba(0,0,0,.02);}

.Nicole-cp-h{font-size:13px;font-weight:500;color:#222;margin-bottom:14px;display:flex;align-items:center;gap:8px;}

.Nicole-sign-mod{display:flex;flex-direction:column;gap:10px;background:rgba(255,255,255,.8);padding:14px;border-radius:16px;margin-bottom:12px;}

.Nicole-sign-hd{display:flex;align-items:center;gap:10px;}

.Nicole-sign-bd{font-size:12px;color:#444;line-height:1.5;padding-left:42px;word-wrap:break-word;font-weight:300;}

.Nicole-sign-act{display:flex;align-items:center;background:rgba(0,0,0,.03);border-radius:18px;padding:4px;margin-top:10px;}

.Nicole-jusignin{flex:1;border:none;background:transparent;padding:8px 12px;font-size:12px;outline:none;color:#222;min-width:0;font-weight:400;}

.Nicole-jusignsave{height:30px;padding:0 16px;border:none;border-radius:15px;background:#222;color:#fff;font-size:12px;font-weight:500;cursor:pointer;flex-shrink:0;}

.Nicole-signdel{cursor:pointer;color:#aaa;margin-left:auto;padding:4px;transition:color .2s;}

.Nicole-signdel:active{color:#666;}

.Nicole-cp-things,.Nicole-cp-days{display:flex;flex-direction:column;gap:8px;}

.Nicole-cp-thing{display:flex;align-items:center;gap:10px;font-size:13px;color:#333;padding:10px 14px;background:rgba(255,255,255,.8);border-radius:12px;font-weight:400;}

.Nicole-cp-thing .dot{width:16px;height:16px;border-radius:50%;border:1.5px solid #ccc;flex-shrink:0;cursor:pointer;}

.Nicole-cp-thing.done{opacity:.4;} .Nicole-cp-thing.done .dot{background:#ccc;border-color:#ccc;}

.Nicole-cp-addrow{display:flex;align-items:center;background:rgba(0,0,0,.02);border-radius:14px;padding:6px;margin-top:12px;gap:6px;flex-wrap:wrap;border:.5px solid rgba(0,0,0,.03);}

.Nicole-cp-addrow input,.Nicole-cp-addrow select{flex:1;min-width:60px;border:none;background:#fff;border-radius:10px;padding:8px 10px;font-size:12px;outline:none;color:#222;}

.Nicole-cp-addrow button{height:32px;padding:0 16px;border:none;border-radius:10px;background:#222;color:#fff;font-size:12px;font-weight:500;cursor:pointer;}

.Nicole-cp-day{display:flex;align-items:center;justify-content:space-between;padding:12px 16px;background:rgba(255,255,255,.8);border-radius:14px;}

.Nicole-cp-day span{font-size:14px;font-weight:500;color:#222;max-width:60%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}

.Nicole-cp-day b{color:#555;font-size:11px;font-weight:400;background:rgba(0,0,0,.03);padding:6px 12px;border-radius:20px;}

.Nicole-cp-albums{display:grid;grid-template-columns:repeat(2,1fr);gap:10px;padding:6px 0;}

.Nicole-cp-album-card{position:relative;background:rgba(255,255,255,.8);border-radius:16px;overflow:hidden;display:flex;flex-direction:column;cursor:pointer;border:.5px solid rgba(0,0,0,.03);}

.Nicole-cp-album-img{width:100%;aspect-ratio:1;background-size:cover;background-position:center;border:none;}

.Nicole-cp-album-txt{padding:8px 10px;font-size:11px;color:#333;font-weight:400;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;background:#fff;}

.Nicole-cp-album-txt-only{padding:14px;font-size:13px;color:#222;text-align:center;display:flex;align-items:center;justify-content:center;height:100%;aspect-ratio:1;background:#fff;font-weight:400;word-wrap:break-word;white-space:pre-wrap;overflow-y:auto;scrollbar-width:none;line-height:1.5;border:none;}

.Nicole-cp-album-who{position:absolute;top:6px;right:6px;background:rgba(0,0,0,.2);color:#fff;font-size:10px;padding:4px 8px;border-radius:10px;backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);pointer-events:none;font-weight:300;}

.Nicole-pyq-panel{position:absolute;inset:0;background:#fdfdfd;z-index:60;display:flex;flex-direction:column;transform:translateX(100%);transition:transform .3s cubic-bezier(.2,.8,.2,1);}

.Nicole-pyq-panel.show{transform:translateX(0);}

.Nicole-pyq-hd{padding:24px 20px 12px;display:flex;align-items:center;justify-content:space-between;background:rgba(253,253,253,.9);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);z-index:26;border-bottom:.5px solid rgba(0,0,0,.03);}

.Nicole-pyq-back{cursor:pointer;display:flex;align-items:center;color:#222;}

.Nicole-pyq-back svg{width:24px;height:24px;stroke:currentColor;stroke-width:1.5;fill:none;}

.Nicole-pyq-addbtn{width:36px;height:36px;border-radius:50%;background:rgba(0,0,0,.03);display:flex;justify-content:center;align-items:center;cursor:pointer;}

.Nicole-pyq-addbtn svg{width:18px;height:18px;stroke:#222;stroke-width:1.5;fill:none;}

.Nicole-pyq-scroll{flex:1;overflow-y:auto;scrollbar-width:none;padding-bottom:20px;}

.Nicole-pyq-cover{height:200px;background-color:#f0f0f0;background-size:cover;background-position:center;position:relative;cursor:pointer;}

.Nicole-pyq-user{position:absolute;right:20px;bottom:-24px;display:flex;align-items:flex-end;gap:14px;}

.Nicole-pyq-uname{font-size:16px;font-weight:600;color:#fff;text-shadow:0 1px 6px rgba(0,0,0,.4);margin-bottom:28px;letter-spacing:.5px;}

.Nicole-pyq-uav{width:72px;height:72px;border-radius:16px;background-size:cover;cursor:pointer;transition:border-radius .3s;border:1px solid rgba(255,255,255,.8);}

.Nicole-pyq-list{padding:48px 20px 20px;display:flex;flex-direction:column;gap:24px;}

.Nicole-pyq-item{display:flex;gap:12px;padding-bottom:20px;position:relative;border-bottom:.5px solid rgba(0,0,0,.03);}

.Nicole-pyq-delbtn{position:absolute;right:0;top:0;padding:6px;color:#ccc;cursor:pointer;transition:color .2s;}

.Nicole-pyq-delbtn:active{color:#888;}

.Nicole-pyq-delbtn svg{width:16px;height:16px;stroke:currentColor;fill:none;stroke-width:1.5;}

.Nicole-pyq-iav{width:44px;height:44px;border-radius:12px;background-size:cover;flex-shrink:0;transition:border-radius .3s;border:.5px solid rgba(0,0,0,.03);}

.Nicole-pyq-ict{flex:1;min-width:0;display:flex;flex-direction:column;gap:8px;}

.Nicole-pyq-inm{font-size:14px;font-weight:500;color:#222;letter-spacing:.2px;}

.Nicole-pyq-itxt{font-size:13px;color:#444;line-height:1.6;white-space:pre-wrap;word-break:break-word;font-weight:300;}

.Nicole-pyq-iimg{max-width:80%;border-radius:12px;margin-top:4px;display:block;border:.5px solid rgba(0,0,0,.03);}

.Nicole-pyq-txtimg{display:flex!important;justify-content:center!important;align-items:center!important;width:130px!important;aspect-ratio:1!important;background:rgba(0,0,0,.02)!important;border-radius:16px!important;padding:14px!important;font-size:14px!important;font-weight:400!important;color:#222!important;text-align:center!important;word-wrap:break-word!important;white-space:pre-wrap!important;line-height:1.5!important;cursor:pointer!important;overflow:hidden!important;margin-top:4px;border:.5px solid rgba(0,0,0,.03)!important;box-shadow:none!important;}

.Nicole-pyq-ibot{display:flex;justify-content:space-between;align-items:center;margin-top:6px;font-size:11px;color:#999;font-weight:300;}

.Nicole-pyq-iacts{display:flex;gap:16px;}

.Nicole-pyq-btn{display:flex;align-items:center;gap:4px;cursor:pointer;color:#888;transition:color .2s;}

.Nicole-pyq-btn:active{color:#222;}

.Nicole-pyq-btn svg{width:16px;height:16px;fill:none;stroke:currentColor;stroke-width:1.5;}

.Nicole-pyq-ints{background:rgba(0,0,0,.02);border-radius:12px;margin-top:10px;font-size:12px;color:#444;border:.5px solid rgba(0,0,0,.02);}

.Nicole-pyq-likes{padding:8px 12px;display:flex;align-items:center;gap:8px;color:#222;font-weight:500;border:none;}

.Nicole-pyq-likes svg{width:14px;height:14px;fill:currentColor;}

.Nicole-pyq-coms{padding:8px 12px;display:flex;flex-direction:column;gap:6px;border-top:.5px solid rgba(0,0,0,.03);}

.Nicole-pyq-com{cursor:pointer;transition:opacity .2s;font-weight:300;}

.Nicole-pyq-com:active{opacity:.6;}

.Nicole-pyq-com span{font-weight:500;color:#222;}
#nicole-float{position:fixed;bottom:20px;right:20px;z-index:999999;font-family:-apple-system,BlinkMacSystemFont,"Helvetica Neue",Arial,sans-serif;}
#nicole-toggle-btn{width:48px;height:48px;border-radius:50%;background:rgba(255,255,255,.95);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);box-shadow:0 4px 16px rgba(0,0,0,.15);display:flex;justify-content:center;align-items:center;cursor:pointer;transition:transform .2s,box-shadow .2s;border:1px solid rgba(0,0,0,.05);}
#nicole-toggle-btn:hover{transform:scale(1.08);box-shadow:0 6px 20px rgba(0,0,0,.2);}
#nicole-toggle-btn:active{transform:scale(.95);}
#nicole-toggle-btn svg{width:24px;height:24px;stroke:#333;fill:none;stroke-width:1.5;}
#nicole-phone-panel{position:absolute;bottom:60px;right:0;width:var(--nc-phone-w,360px);height:var(--nc-phone-h,680px);max-height:90vh;display:none;animation:nicole-fade-in .3s ease;}
#nicole-phone-panel.show{display:block;}
@keyframes nicole-fade-in{from{opacity:0;transform:translateY(10px);}to{opacity:1;transform:translateY(0);}}

/* ============ 移动端适配 ============ */
@media (max-width:768px){
    #nicole-float{position:fixed !important;left:auto !important;top:auto !important;bottom:20px !important;right:20px !important;width:38px !important;height:38px !important;z-index:999999!important;}
    #nicole-toggle-btn{width:38px;height:38px;}
    #nicole-toggle-btn svg{width:18px;height:18px;}
    #nicole-phone-panel{
    position:fixed;
    top:50%;
    left:50%;
    transform:translate(-50%,-50%);
    width:90%;
    max-width:360px;
    height:80dvh;
    max-height:80dvh;
    border-radius:16px;
    overflow:hidden;
    box-shadow:0 10px 40px rgba(0,0,0,.3);
    background: #f2f2f7; /* 新增：强制底色，防止变透明 */
}
    #nicole-phone-panel.show{display:block;}
    .Nicole-stage{width:100%;padding:6px 0;}
    .Nicole-phone-wrap{padding:4px;max-width:100%;border-radius:28px;}
    .Nicole-phone{height:100%;max-height:100%;border-radius:24px;font-size:12px;}
    .Nicole-ios-statusbar{height:20px;font-size:10px;}
    .Nicole-home-screen{font-size:11px;}
    .Nicole-app-icon{width:42px;height:42px;font-size:9px;}
    .Nicole-app-name{font-size:9px;}
    .Nicole-dock{height:48px;padding:6px;}
    .Nicole-chat-hd{height:44px;font-size:13px;}
    .Nicole-jchat{padding:8px 6px;}
    .Nicole-row{margin:4px 0;gap:6px;}
    .Nicole-row .Nicole-lav,.Nicole-row .Nicole-rav{width:28px;height:28px;min-width:28px;}
    .Nicole-bub{padding:7px 10px;font-size:12px;max-width:70%;}
    .Nicole-au{padding:7px 10px;font-size:11px;}
    .Nicole-au-dur{font-size:10px;}
    .Nicole-au-txt{font-size:11px;}
    .Nicole-meta{font-size:9px;}
    .Nicole-ft{height:44px;padding:6px 8px;gap:6px;}
    .Nicole-input{height:32px;font-size:12px;padding:0 10px;}
    .Nicole-ft button{width:32px;height:32px;font-size:14px;}
    .Nicole-call{font-size:12px;}
    .Nicole-call-nm{font-size:14px;}
    .Nicole-call-timer{font-size:11px;}
    .Nicole-call-st{font-size:10px;}
    .Nicole-call-bubs{padding:8px;}
    .Nicole-cb{padding:6px 10px;font-size:12px;max-width:75%;}
    .Nicole-call-ft{height:44px;padding:6px 8px;}
    .Nicole-call-in{height:32px;font-size:12px;}
    .Nicole-call-btn{width:44px;height:44px;}
    .Nicole-call-btn svg{width:20px;height:20px;}
    .Nicole-set{font-size:11px;}
    .Nicole-set-h{height:36px;font-size:13px;}
    .Nicole-set-r{padding:8px 10px;gap:6px;}
    .Nicole-set input,.Nicole-set select{height:30px;font-size:11px;}
    .Nicole-mf{font-size:11px;}
    .Nicole-mbox{padding:12px;}
    .Nicole-mh{height:36px;font-size:13px;}
    .Nicole-act-btn{padding:8px 12px;font-size:11px;}
    .Nicole-sys-msg{font-size:10px;padding:4px 8px;}
    .Nicole-chatlist-item{padding:8px 10px;gap:8px;}
    .Nicole-chatlist-av{width:36px;height:36px;}
    .Nicole-chatlist-name{font-size:12px;}
    .Nicole-chatlist-msg{font-size:10px;}
    .Nicole-pyq-item{padding:8px 10px;gap:8px;}
    .Nicole-pyq-uav{width:32px;height:32px;}
    .Nicole-pyq-txt{font-size:11px;}
    .Nicole-mu-list{max-height:180px!important;}
    .Nicole-mu-item{padding:8px 10px;font-size:11px;}
    .Nicole-mu-ctrl{gap:4px;}
    .Nicole-mu-btn{width:28px;height:28px;}
    .Nicole-mu-btn svg{width:14px;height:14px;}
    .Nicole-sticky-note{font-size:11px;padding:8px;}
    .Nicole-loc-wrap{height:200px;}
    .Nicole-draw-canvas{height:200px;}
    .Nicole-img{max-width:120px;}
    .Nicole-tf{padding:8px 10px;font-size:11px;}
    .Nicole-tf-ic{width:32px;height:32px;font-size:14px;}
    .Nicole-link-card{padding:8px 10px;font-size:11px;}
    .Nicole-gift-card{padding:8px 10px;font-size:11px;}
    .Nicole-food-card{padding:8px 10px;font-size:11px;}
    .nc-inline-row{max-width:85%;}
    .nc-inline-bub{padding:6px 10px;font-size:12px;}
    .nc-inline-av{width:28px;height:28px;font-size:11px;}
    .nc-inline-name{font-size:10px;}
    /* 移除移动端backdrop-filter避免透明问题 */
    .Nicole-au,.Nicole-bub,.Nicole-call,.Nicole-mbox,.Nicole-set,.Nicole-mf,.Nicole-stage,.Nicole-phone-wrap{backdrop-filter:none!important;-webkit-backdrop-filter:none!important;}
}
@media (max-width:480px){
    #nicole-float{bottom:calc(12px + env(safe-area-inset-bottom,0px));right:10px;z-index:999999!important;}
    #nicole-toggle-btn{width:38px;height:38px;}
    #nicole-toggle-btn svg{width:18px;height:18px;}
}
`;

/* ============ HTML TEMPLATE ============ */
var HTML = `<div class="Nicole-stage"><div class="Nicole-phone-wrap" id="Nc-Phone-Wrapper"><div class="Nicole-phone"><div class="Nicole-home-screen Nicole-jhome"><div class="Nicole-ios-statusbar"><div class="Nicole-jhome-time">12:00</div><div class="Nicole-ios-statusbar-right"><svg viewBox="0 0 24 24"><path d="M12 20h2V10h-2v10zm-4 0h2v-6H8v6zm8-14v14h2V6h-2zM4 20h2v-3H4v3z"/></svg><svg viewBox="0 0 24 24"><path d="M12 3c-4.8 0-9.1 1.9-12.3 5l1.4 1.4C4.1 6.5 7.9 4.8 12 4.8s7.9 1.7 10.9 4.6l1.4-1.4C21.1 4.9 16.8 3 12 3zm0 5.5c-3.2 0-6.2 1.2-8.5 3.3l1.4 1.4c1.9-1.7 4.4-2.7 7.1-2.7s5.2 1 7.1 2.7l1.4-1.4C18.2 9.7 15.2 8.5 12 8.5zm0 5c-1.6 0-3.1.6-4.2 1.6l1.4 1.4c.8-.7 1.8-1 2.8-1s2 .3 2.8 1l1.4-1.4c-1.1-1-2.6-1.6-4.2-1.6zm0 4.5c-.8 0-1.5.7-1.5 1.5S11.2 21 12 21s1.5-.7 1.5-1.5S12.8 18 12 18z"/></svg><div class="Nicole-ios-battery"><div class="Nicole-ios-battery-level"></div></div></div></div><div class="Nicole-sticky-note"><div class="Nicole-sticky-tape"></div><textarea class="Nicole-sticky-textarea Nicole-jsticky-txt" placeholder="在这里写下便签..."></textarea><button class="Nicole-sticky-btn Nicole-jsticky-save">保存更新</button></div><div class="Nicole-dock"><div class="Nicole-dock-icon" id="app-wechat"><svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg></div><div class="Nicole-dock-icon" id="app-phone"><svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg></div></div></div><div class="Nicole-chatlist-screen Nicole-jchatlist-screen"><div class="Nicole-chatlist-hd"><span class="back Nicole-jchatlist-back"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"></polyline></svg></span>聊天列表<span class="add Nicole-jchatlist-add"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg></span></div><div class="Nicole-chatlist-body Nicole-jchatlist-body"></div></div><div class="Nicole-addchar-modal Nicole-jaddchar-modal"><div class="Nicole-addchar-box"><h4>添加聊天人物</h4><input type="text" class="Nicole-jaddchar-input" placeholder="输入角色名字（如：沈又青）"><div class="Nicole-addchar-btns"><button class="cancel Nicole-jaddchar-cancel">取消</button><button class="ok Nicole-jaddchar-ok">添加</button></div></div></div><div class="Nicole-sys-app Nicole-japp-panel"><div class="Nicole-sys-app-hd"><div class="Nicole-japp-back" style="cursor:pointer;"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#222" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg></div><span class="Nicole-japp-title" style="flex:1;text-align:center;padding-right:24px;">电话</span></div><div class="Nicole-sys-app-body Nicole-japp-body"><div class="Nicole-phone-app-container"><div class="Nicole-phone-content" id="phone-content"></div><div class="Nicole-phone-tabbar"><div class="Nicole-ptab active" data-target="recents"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>最近通话</div><div class="Nicole-ptab" data-target="contacts"><svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>联系人</div><div class="Nicole-ptab" data-target="dialpad"><svg viewBox="0 0 24 24"><circle cx="6" cy="6" r="2"></circle><circle cx="12" cy="6" r="2"></circle><circle cx="18" cy="6" r="2"></circle><circle cx="6" cy="12" r="2"></circle><circle cx="12" cy="12" r="2"></circle><circle cx="18" cy="12" r="2"></circle><circle cx="6" cy="18" r="2"></circle><circle cx="12" cy="18" r="2"></circle><circle cx="18" cy="18" r="2"></circle></svg>拨号键盘</div></div></div></div></div><div class="Nicole-content-layer Nicole-root"><div class="Nicole-bg Nicole-jbg"></div><div class="Nicole-call Nicole-jcall state-out"><div class="Nicole-call-mini-hint"></div><div class="Nicole-call-vbg Nicole-bind-lav-bg"></div><div class="Nicole-call-pip Nicole-bind-rav-bg"></div><div class="Nicole-call-mini-top Nicole-jcall-mini-top"><svg viewBox="0 0 24 24"><path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"/></svg></div><div class="Nicole-call-ct"><div class="Nicole-call-avs"><div class="Nicole-call-av Nicole-jcall-lav Nicole-bind-lav"></div><div class="Nicole-call-av Nicole-jcall-rav Nicole-bind-rav"></div></div><div class="Nicole-call-nm Nicole-jcall-nm Nicole-bind-lnm"></div><div class="Nicole-call-timer Nicole-jcall-timer">00:00</div><div class="Nicole-call-st Nicole-jcall-st">正在呼叫...</div><div class="Nicole-call-bubs Nicole-jcall-bubs"></div><div class="Nicole-call-ft"><div class="Nicole-call-btns btns-in"><div class="Nicole-call-btn hangup Nicole-jcall-reject"><svg viewBox="0 0 24 24"><path d="M10.5 4.5l-2-2a2 2 0 0 0-2.83 0l-2 2a2 2 0 0 0 0 2.83l9 9a2 2 0 0 0 2.83 0l2-2a2 2 0 0 0 0-2.83z"/><path d="M14 8h5v5"/><path d="M19 8l-5 5"/></svg></div><div class="Nicole-call-btn answer Nicole-jcall-answer"><svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg></div></div><div class="Nicole-call-btns btns-out"><div class="Nicole-call-btn cancel Nicole-jcall-cancel"><svg viewBox="0 0 24 24"><path d="M10.5 4.5l-2-2a2 2 0 0 0-2.83 0l-2 2a2 2 0 0 0 0 2.83l9 9a2 2 0 0 0 2.83 0l2-2a2 2 0 0 0 0-2.83z"/><path d="M14 8h5v5"/><path d="M19 8l-5 5"/></svg></div></div><div class="Nicole-call-inrow"><div class="Nicole-call-btn hangup mini Nicole-jcall-end" title="挂断"><svg viewBox="0 0 24 24"><path d="M10.5 4.5l-2-2a2 2 0 0 0-2.83 0l-2 2a2 2 0 0 0 0 2.83l9 9a2 2 0 0 0 2.83 0l2-2a2 2 0 0 0 0-2.83z"/><path d="M14 8h5v5"/><path d="M19 8l-5 5"/></svg></div><input type="text" class="Nicole-call-in Nicole-jcall-in" placeholder="发送实时消息..."><button class="Nicole-call-send Nicole-jcall-send">发送</button></div></div></div></div><div class="Nicole-hd Nicole-jhd"><div class="Nicole-notch"></div><div class="Nicole-hd-back Nicole-jhd-back" title="返回主界面"><svg viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"></polyline></svg></div><div class="Nicole-hd-ph" style="display:none;"></div><div class="Nicole-hd-mid"><div class="Nicole-ubox Nicole-jpat-l"><div class="Nicole-uav Nicole-bind-lav" title="点击修改拍一拍"></div><div class="Nicole-uname Nicole-bind-lnm" title="点击修改对方备注"></div></div><div class="Nicole-waves"><span class="Nicole-wave"></span><span class="Nicole-wave"></span><span class="Nicole-wave"></span><span class="Nicole-wave"></span><span class="Nicole-wave"></span><span class="Nicole-wave"></span></div><div class="Nicole-ubox Nicole-jpat-r"><div class="Nicole-uav Nicole-bind-rav" title="点击修改拍一拍"></div><div class="Nicole-uname Nicole-bind-rnm" title="点击修改自己备注"></div></div></div><div class="Nicole-icons-rt"><div class="Nicole-icbtn Nicole-jcollapse" title="收起手机" style="cursor:pointer;padding:4px;"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"></line></svg></div><div class="Nicole-icbtn pyq Nicole-jpyqbtn" title="朋友圈"><svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg></div><div class="Nicole-icbtn Nicole-jset-open" title="设置"><svg viewBox="0 0 24 24"><circle cx="12" cy="5" r="2.5"/><circle cx="12" cy="12" r="2.5"/><circle cx="12" cy="19" r="2.5"/></svg></div></div><div class="Nicole-hd-pull Nicole-jhd-toggle"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg></div></div><div class="Nicole-chat Nicole-jchat"></div><div class="Nicole-pyq-panel Nicole-jpyqpanel"><div class="Nicole-pyq-hd"><div class="Nicole-pyq-back Nicole-jpyqback" title="返回"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="15 18 9 12 15 6"></polyline></svg></div><div class="Nicole-pyq-addbtn Nicole-jpyqadd"><svg viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg></div></div><div class="Nicole-pyq-scroll"><div class="Nicole-pyq-cover Nicole-jpyq-cover" title="点击更换背景"><div class="Nicole-pyq-user"><div class="Nicole-pyq-uname Nicole-bind-rnm"></div><div class="Nicole-pyq-uav Nicole-jpyq-uav" title="点击更换头像"></div></div></div><div class="Nicole-pyq-list Nicole-jpyqlist"></div></div></div><div class="Nicole-txt-zoom Nicole-jtxtzoom"><div class="Nicole-txt-zoom-in Nicole-jtxtzoomin"></div></div>
<div class="Nicole-set Nicole-jset"><div class="Nicole-set-h">视觉控制台<span class="Nicole-set-x Nicole-jset-close">&times;</span></div><div class="Nicole-set-r"><label>左侧名称</label><div class="Nicole-color-wrap"><input type="text" class="Nicole-hex-in Nicole-jset-lnm" placeholder="输入名称" style="width:100px;"></div></div><div class="Nicole-set-r"><label>右侧名称</label><div class="Nicole-color-wrap"><input type="text" class="Nicole-hex-in Nicole-jset-rnm" placeholder="输入名称" style="width:100px;"></div></div><div class="Nicole-set-r"><label>聊天记录</label><div class="Nicole-color-wrap"><button class="Nicole-bg-btn Nicole-jclear-chat" style="background:#ff6b6b;color:#fff;border:none;">清空当前聊天</button></div></div><div class="Nicole-set-r"><label>手机宽度</label><div class="Nicole-color-wrap"><input type="number" class="Nicole-hex-in Nicole-jset-phone-w" placeholder="360" style="width:80px;" min="240" max="500"><span style="font-size:11px;color:#999;">px</span></div></div><div class="Nicole-set-r"><label>手机高度</label><div class="Nicole-color-wrap"><input type="number" class="Nicole-hex-in Nicole-jset-phone-h" placeholder="680" style="width:80px;" min="400" max="900"><span style="font-size:11px;color:#999;">px</span></div></div><div class="Nicole-set-r"><label>拉黑拦截控制</label><div class="Nicole-color-wrap"><button class="Nicole-bg-btn Nicole-jblk-l" title="右侧拉黑左侧，左侧发出的消息带叹号">右侧拉黑左侧</button><button class="Nicole-bg-btn Nicole-jblk-r" title="左侧拉黑右侧，右侧发出的消息带叹号">左侧拉黑右侧</button></div></div><div class="Nicole-set-r"><label>左侧头像（角色）</label><div class="Nicole-color-wrap"><button class="Nicole-bg-btn Nicole-jav-l-upload">上传头像</button><button class="Nicole-bg-btn Nicole-jav-l-clear">恢复默认</button></div></div><div class="Nicole-set-r"><label>右侧头像（我）</label><div class="Nicole-color-wrap"><button class="Nicole-bg-btn Nicole-jav-r-upload">上传头像</button><button class="Nicole-bg-btn Nicole-jav-r-clear">恢复默认</button></div></div><div class="Nicole-set-r"><label>主页背景</label><div class="Nicole-color-wrap"><button class="Nicole-bg-btn Nicole-jbg-home-upload">上传/更换</button><button class="Nicole-bg-btn Nicole-jbg-home-clear">恢复默认</button></div></div><div class="Nicole-set-r"><label>聊天背景</label><div class="Nicole-color-wrap"><button class="Nicole-bg-btn Nicole-jbg-chat-upload">上传/更换</button><button class="Nicole-bg-btn Nicole-jbg-chat-clear">恢复默认</button></div></div><div class="Nicole-set-r"><label>头像形状</label><div class="Nicole-color-wrap"><button class="Nicole-bg-btn Nicole-jav-rnd active">圆形</button><button class="Nicole-bg-btn Nicole-jav-sq">方形</button></div></div><div class="Nicole-set-r"><label>质感风格</label><div class="Nicole-color-wrap"><button class="Nicole-bg-btn Nicole-jglass-glass active">毛玻璃</button><button class="Nicole-bg-btn Nicole-jglass-solid">纯实色</button></div></div><div class="Nicole-set-r"><label>手机外壳</label><div class="Nicole-color-wrap"><input type="text" id="Nc-wrap-txt" class="Nicole-hex-in"><input type="color" id="Nc-wrap"></div></div><div class="Nicole-set-r"><label>顶部栏背景</label><div class="Nicole-color-wrap"><input type="text" id="Nc-hdr-txt" class="Nicole-hex-in"><input type="color" id="Nc-hdr"></div></div><div class="Nicole-set-r"><label>顶部下拉键</label><div class="Nicole-color-wrap"><input type="text" id="Nc-pull-txt" class="Nicole-hex-in"><input type="color" id="Nc-pull"></div></div><div class="Nicole-set-r"><label>波浪呼吸条</label><div class="Nicole-color-wrap"><input type="text" id="Nc-wv-txt" class="Nicole-hex-in"><input type="color" id="Nc-wv"></div></div><div class="Nicole-set-r"><label>交互卡片底色</label><div class="Nicole-color-wrap"><input type="text" id="Nc-card-txt" class="Nicole-hex-in"><input type="color" id="Nc-card"></div></div><div class="Nicole-set-r"><label>底部输入区</label><div class="Nicole-color-wrap"><input type="text" id="Nc-ftr-txt" class="Nicole-hex-in"><input type="color" id="Nc-ftr"></div></div><div class="Nicole-set-r"><label>我方气泡</label><div class="Nicole-color-wrap"><input type="text" id="Nc-bub-txt" class="Nicole-hex-in"><input type="color" id="Nc-bub"></div></div><div class="Nicole-set-r"><label>对方气泡</label><div class="Nicole-color-wrap"><input type="text" id="Nc-bubl-txt" class="Nicole-hex-in"><input type="color" id="Nc-bubl"></div></div><div class="Nicole-set-r"><label>气泡文字</label><div class="Nicole-color-wrap"><input type="text" id="Nc-tm-txt" class="Nicole-hex-in"><input type="color" id="Nc-tm"></div></div><div class="Nicole-set-r"><label>交互卡片字</label><div class="Nicole-color-wrap"><input type="text" id="Nc-cdt-txt" class="Nicole-hex-in"><input type="color" id="Nc-cdt"></div></div><div class="Nicole-set-r"><label>交互卡片图标</label><div class="Nicole-color-wrap"><input type="text" id="Nc-cic-txt" class="Nicole-hex-in"><input type="color" id="Nc-cic"></div></div><div class="Nicole-set-r"><label>顶部栏文字</label><div class="Nicole-color-wrap"><input type="text" id="Nc-hdt-txt" class="Nicole-hex-in"><input type="color" id="Nc-hdt"></div></div><div class="Nicole-set-r"><label>顶部栏图标</label><div class="Nicole-color-wrap"><input type="text" id="Nc-hdi-txt" class="Nicole-hex-in"><input type="color" id="Nc-hdi"></div></div><div class="Nicole-set-r"><label>系统提示字</label><div class="Nicole-color-wrap"><input type="text" id="Nc-sys-txt" class="Nicole-hex-in"><input type="color" id="Nc-sys"></div></div><div class="Nicole-set-r"><label>通话左气泡</label><div class="Nicole-color-wrap"><input type="text" id="Nc-cbubl-txt" class="Nicole-hex-in"><input type="color" id="Nc-cbubl"></div></div><div class="Nicole-set-r"><label>通话右气泡</label><div class="Nicole-color-wrap"><input type="text" id="Nc-cbub-txt" class="Nicole-hex-in"><input type="color" id="Nc-cbub"></div></div><div class="Nicole-set-r"><label>通话气泡字</label><div class="Nicole-color-wrap"><input type="text" id="Nc-cbtxt-txt" class="Nicole-hex-in"><input type="color" id="Nc-cbtxt"></div></div></div><div class="Nicole-ft"><div class="Nicole-reply-bar Nicole-jrepbar"><span class="Nicole-reply-txt Nicole-jreptxt"></span><div class="Nicole-reply-close Nicole-jrepclose">×</div></div><div class="Nicole-in-area"><div class="Nicole-lang Nicole-jlang">CN</div><div class="Nicole-plus Nicole-jplus"><svg viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg></div><input type="text" class="Nicole-input Nicole-jinput" placeholder="输入文字发送..."><div class="Nicole-mic Nicole-jmic"><svg viewBox="0 0 24 24"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="22"></line></svg></div><div class="Nicole-send Nicole-jsend"><svg viewBox="0 0 24 24"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg></div></div><div class="Nicole-panel Nicole-jpanel"><div class="Nicole-pi Nicole-jbtn-voice"><div class="Nicole-pic"><svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg></div><div class="Nicole-ptx">语音呼叫</div></div><div class="Nicole-pi Nicole-jbtn-video"><div class="Nicole-pic"><svg viewBox="0 0 24 24"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg></div><div class="Nicole-ptx">视频呼叫</div></div><div class="Nicole-pi Nicole-jimgbtn"><div class="Nicole-pic"><svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg></div><div class="Nicole-ptx">发原图</div></div><div class="Nicole-pi Nicole-jtxtimg"><div class="Nicole-pic"><svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7 8h10M7 12h10M7 16h6"/></svg></div><div class="Nicole-ptx">发文字图</div></div><div class="Nicole-pi Nicole-jgiftbtn"><div class="Nicole-pic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><polyline points="20 12 20 22 4 22 4 12"></polyline><rect x="2" y="7" width="20" height="5"></rect><line x1="12" y1="22" x2="12" y2="7"></line><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"></path><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"></path></svg></div><div class="Nicole-ptx">送礼物</div></div><div class="Nicole-pi Nicole-jlinkbtn"><div class="Nicole-pic"><svg viewBox="0 0 24 24"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></div><div class="Nicole-ptx">发链接</div></div><div class="Nicole-pi Nicole-jtf"><div class="Nicole-pic"><svg viewBox="0 0 24 24" class="fl"><path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/></svg></div><div class="Nicole-ptx">转账</div></div><div class="Nicole-pi Nicole-jemo"><div class="Nicole-pic"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg></div><div class="Nicole-ptx">表情包</div></div><div class="Nicole-pi Nicole-jmusic"><div class="Nicole-pic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6"></path><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path></svg></div><div class="Nicole-ptx">一起听歌</div></div><div class="Nicole-pi Nicole-jcp"><div class="Nicole-pic"><svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg></div><div class="Nicole-ptx">情侣空间</div></div><div class="Nicole-pi Nicole-jbtn-loc"><div class="Nicole-pic"><svg viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg></div><div class="Nicole-ptx">共享位置</div></div><div class="Nicole-pi Nicole-jbtn-food"><div class="Nicole-pic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg></div><div class="Nicole-ptx">点外卖</div></div><div class="Nicole-pi Nicole-jbtn-draw"><div class="Nicole-pic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg></div><div class="Nicole-ptx">手绘便签</div></div></div></div>
<div class="Nicole-mf Nicole-jmsgact"><div class="Nicole-mbox" style="height:auto; padding-bottom:24px;"><div class="Nicole-act-btn Nicole-jact-reply">引用回复</div><div class="Nicole-act-btn Nicole-jact-revoke" style="display:none; color:#222;">撤回消息</div><div class="Nicole-act-btn Nicole-jact-delete" style="color:#ff3b30;">删除消息</div><div class="Nicole-act-space"></div><div class="Nicole-act-btn Nicole-jact-cancel" style="color:#888;">取消</div></div></div><div class="Nicole-cen Nicole-jaddfriendmodal w260"><div class="Nicole-cen-box"><h4>重新添加好友</h4><input type="text" class="Nicole-cen-inp Nicole-jaddgreet" placeholder="打个招呼吧..."><div class="Nicole-cen-btns"><button class="cc Nicole-jaddfcancel">取消</button><button class="ok Nicole-jaddfok">发送申请</button></div></div></div><div class="Nicole-cen Nicole-jtfactmodal w260"><div class="Nicole-cen-box"><h4>转账处理</h4><div style="font-size:13px;color:#888;text-align:center;font-weight:300;">请选择对该笔转账的操作</div><div class="Nicole-cen-btns"><button class="cc Nicole-jtfact-return">退回</button><button class="ok Nicole-jtfact-receive">收款</button></div><div class="Nicole-cen-btns" style="margin-top:-6px;"><button class="cc Nicole-jtfact-cancel" style="width:100%;">取消</button></div></div></div><div class="Nicole-cen Nicole-jlocinputmodal w260"><div class="Nicole-cen-box"><h4>发送位置分享</h4><input type="text" class="Nicole-cen-inp Nicole-jlocin-pos" placeholder="我的位置 (如:朝阳区)"><input type="text" class="Nicole-cen-inp Nicole-jlocin-dist" placeholder="相距距离 (如:12.5 km)"><div class="Nicole-cen-btns"><button class="cc Nicole-jlocincancel">取消</button><button class="ok Nicole-jlocinok">发送</button></div></div></div><div class="Nicole-cen Nicole-jdrawmodal w260"><div class="Nicole-cen-box" style="width:290px; padding:20px;"><h4>手绘涂鸦</h4><canvas class="Nicole-draw-canvas Nicole-jdrawcanvas" width="246" height="246"></canvas><div class="Nicole-draw-tools"><input type="color" class="Nicole-draw-color Nicole-jdrawcolor" value="#222222"><input type="range" class="Nicole-draw-range Nicole-jdrawwidth" min="1" max="20" value="3"><div class="Nicole-draw-btn-icon Nicole-jdraweraser" title="橡皮擦"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 20H7L3 16C2.5 15.5 2.5 14.5 3 14L13 4C13.5 3.5 14.5 3.5 15 4L20 9C20.5 9.5 20.5 10.5 20 11L11 20H20V20Z"/></svg></div><div class="Nicole-draw-btn-icon Nicole-jdrawundo" title="撤销"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10h10a5 5 0 0 1 5 5v2"/><polyline points="7 6 3 10 7 14"/></svg></div><div class="Nicole-draw-btn-icon Nicole-jdrawclear" title="清空画布"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg></div></div><div class="Nicole-cen-btns"><button class="cc Nicole-jdrawcancel">取消</button><button class="ok Nicole-jdrawok">发送</button></div></div></div><div class="Nicole-cen Nicole-jgiftmodal w260"><div class="Nicole-cen-box"><h4>送专属礼物</h4><input type="text" class="Nicole-cen-inp Nicole-jgiftdesc" placeholder="礼物名称或描述"><div class="Nicole-tf-grp"><span>¥</span><input type="number" class="Nicole-jgiftpr" placeholder="0.00"></div><input type="text" class="Nicole-cen-inp Nicole-jgiftnote" placeholder="备注留言"><div class="Nicole-cen-btns"><button class="cc Nicole-jgiftcancel">取消</button><button class="ok Nicole-jgiftok">送出</button></div></div></div><div class="Nicole-cen Nicole-jlinkmodal w260"><div class="Nicole-cen-box"><h4>分享外链</h4><input type="text" class="Nicole-cen-inp Nicole-jlinkurl" placeholder="网址URL..."><input type="text" class="Nicole-cen-inp Nicole-jlinktitle" placeholder="分享标题..."><div class="Nicole-cen-btns"><button class="cc Nicole-jlinkcancel">取消</button><button class="ok Nicole-jlinkok">分享</button></div></div></div><div class="Nicole-cen Nicole-jtfmodal"><div class="Nicole-cen-box"><h4>发起转账</h4><div class="Nicole-tf-grp"><span>¥</span><input type="number" class="Nicole-jtfamt" placeholder="0.00"></div><input type="text" class="Nicole-cen-inp Nicole-jtftitle" placeholder="转账说明"><div class="Nicole-cen-btns"><button class="cc Nicole-jtfcancel">取消</button><button class="ok Nicole-jtfok">确认</button></div></div></div><div class="Nicole-cen Nicole-jimgmodal w260"><div class="Nicole-cen-box"><h4>发送原图直链</h4><input type="text" class="Nicole-cen-inp Nicole-jimgurl" placeholder="图片URL直链/AI提示词..."><input type="text" class="Nicole-cen-inp Nicole-jimgdesc" placeholder="图片描述"><div class="Nicole-cen-btns"><button class="cc Nicole-jimgcancel">取消</button><button class="ok Nicole-jimgok">发送直链</button></div></div></div><div class="Nicole-cen Nicole-jtxtimgmodal w260"><div class="Nicole-cen-box"><h4>文字图气泡</h4><textarea class="Nicole-jtxtimgin" rows="3" placeholder="输入气泡中的文字..."></textarea><div class="Nicole-cen-btns"><button class="cc Nicole-jtxtimgcancel">取消</button><button class="ok Nicole-jtxtimgok">发送</button></div></div></div><div class="Nicole-cen Nicole-jfoodmodal w260"><div class="Nicole-cen-box"><h4>高级外卖</h4><input type="text" class="Nicole-cen-inp Nicole-jfoodshop" placeholder="店铺名称 (如: 肯德基)"><input type="text" class="Nicole-cen-inp Nicole-jfooditems" placeholder="外卖内容 (如: 炸鸡套餐)"><input type="text" class="Nicole-cen-inp Nicole-jfoodaddr" placeholder="配送地址"><input type="text" class="Nicole-cen-inp Nicole-jfoodname" placeholder="收件人姓名"><input type="text" class="Nicole-cen-inp Nicole-jfoodphone" placeholder="收件人电话"><div class="Nicole-cen-btns"><button class="cc Nicole-jfoodcancel">取消</button><button class="ok Nicole-jfoodok">下单并发送</button></div></div></div><div class="Nicole-cen Nicole-jvoicemodal w260"><div class="Nicole-cen-box"><h4>语音异常/降级</h4><textarea class="Nicole-jvoicetxt" rows="3" placeholder="麦克风受限，请输入文字..."></textarea><div class="Nicole-cen-btns"><button class="cc Nicole-jvoicecancel">取消</button><button class="ok Nicole-jvoiceok">生成语音条</button></div></div></div><div class="Nicole-cen Nicole-jpatmodal w260"><div class="Nicole-cen-box"><h4>修改拍一拍后缀</h4><div style="font-size:12px;color:#888;text-align:center;font-weight:300;">双击头像时生效</div><input type="text" class="Nicole-cen-inp Nicole-jpatin" placeholder="例如：的脑袋"><div class="Nicole-cen-btns"><button class="cc Nicole-jpatcancel">取消</button><button class="ok Nicole-jpatok">确定</button></div></div></div><div class="Nicole-cen Nicole-jaddemomodal w260"><div class="Nicole-cen-box"><h4>添加自定义表情</h4><input type="text" class="Nicole-cen-inp Nicole-jaddemourl" placeholder="图片URL直链..."><input type="text" class="Nicole-cen-inp Nicole-jaddemotxt" placeholder="说明文字"><div class="Nicole-cen-btns"><button class="cc Nicole-jaddemocancel">取消</button><button class="ok Nicole-jaddemook">保存</button></div></div></div><div class="Nicole-cen Nicole-jviewmodal w260"><div class="Nicole-cen-box"><h4>撤回原文</h4><textarea class="Nicole-cen-inp Nicole-jviewtxt" rows="4" readonly style="background:rgba(255,255,255,.8);"></textarea><div class="Nicole-cen-btns"><button class="ok Nicole-jviewclose" style="width:100%;">关闭</button></div></div></div><div class="Nicole-cen Nicole-jpyqsendmodal w260"><div class="Nicole-cen-box"><h4>发朋友圈</h4><textarea class="Nicole-cen-inp Nicole-jpyqsendtxt" rows="3" placeholder="这一刻的想法..."></textarea><input type="text" class="Nicole-cen-inp Nicole-jpyqsendimg" placeholder="配图URL直链 (可选)"><textarea class="Nicole-cen-inp Nicole-jpyqsendtxtimg" rows="2" placeholder="或者直接发文字图，输入内容..."></textarea><div class="Nicole-cen-btns"><button class="cc Nicole-jpyqsendcancel">取消</button><button class="ok Nicole-jpyqsendok">发表</button></div></div></div><div class="Nicole-cen Nicole-jpyqcommodal w260"><div class="Nicole-cen-box"><h4>评论动态</h4><textarea class="Nicole-cen-inp Nicole-jpyqcomtxt" rows="3" placeholder="说点什么..."></textarea><div class="Nicole-cen-btns"><button class="cc Nicole-jpyqcomcancel">取消</button><button class="ok Nicole-jpyqcomok">评论</button></div></div></div>
<div class="Nicole-mf Nicole-jlocmodal"><div class="Nicole-mbox"><div class="Nicole-mh"><span>位置共享</span><div class="Nicole-mc Nicole-jlocclose">&times;</div></div><div class="Nicole-loc-wrap"><div class="Nicole-cp-top" style="z-index:10;"><div class="Nicole-cp-avs"><div class="Nicole-cp-face Nicole-bind-lav"></div><div class="Nicole-cp-face Nicole-jcpf2 Nicole-bind-rav"></div></div><div class="Nicole-loc-dist">相距 <span id="Nc-loc-dist">未知</span></div></div><div class="Nicole-radar"><div class="Nicole-radar-wave"></div><div class="Nicole-radar-wave w2"></div><div class="Nicole-anchor a1"><div class="Nicole-anchor-av Nicole-bind-lav"></div><div class="Nicole-anchor-tip t1">未获取位置</div></div><div class="Nicole-anchor a2"><div class="Nicole-anchor-av Nicole-bind-rav"></div><div class="Nicole-anchor-tip t2">未获取位置</div></div></div><button class="Nicole-loc-send Nicole-jlocsend">发送当前定位</button></div></div></div><div class="Nicole-mf Nicole-jemomodal"><div class="Nicole-mbox"><div class="Nicole-mh"><span>选择表情与互动</span><div class="Nicole-mc Nicole-jemoclose">&times;</div></div><div class="Nicole-emo-games"><div class="Nicole-emo-gamebtn jemo-poke"><svg viewBox="0 0 24 24"><path d="M11 2a2 2 0 0 0-2 2v5H6a2 2 0 0 0-2 2v2c0 4.4 3.6 8 8 8h3a5 5 0 0 0 5-5v-6a2 2 0 0 0-2-2h-3V4a2 2 0 0 0-2-2z"/></svg>戳一戳</div><div class="Nicole-emo-gamebtn jemo-dice"><svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><circle cx="15.5" cy="15.5" r="1.5"/><circle cx="15.5" cy="8.5" r="1.5"/><circle cx="8.5" cy="15.5" r="1.5"/><circle cx="12" cy="12" r="1.5"/></svg>摇骰子</div><div class="Nicole-emo-gamebtn jemo-rps"><svg viewBox="0 0 24 24"><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><line x1="20" y1="4" x2="8.12" y2="15.88"/><line x1="14.47" y1="14.48" x2="20" y2="20"/><line x1="8.12" y1="8.12" x2="12" y2="12"/></svg>猜拳</div><div class="Nicole-emo-addbtn Nicole-jaddemobtn" title="添加表情"><svg viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg></div></div><div class="Nicole-emo Nicole-jemolist"></div></div></div><div class="Nicole-mf Nicole-jmumodal"><div class="Nicole-mbox"><div class="Nicole-mh"><span>一起听歌</span><div class="Nicole-mc Nicole-jmuclose">&times;</div></div><div class="Nicole-mu"><div class="Nicole-mu-stage"><div class="Nicole-mu-face Nicole-jmuf1 Nicole-bind-lav"></div><div class="Nicole-mu-waves Nicole-jmuwaves"><span class="Nicole-wave"></span><span class="Nicole-wave"></span><span class="Nicole-wave"></span></div><div class="Nicole-mu-face Nicole-jmuf2 Nicole-bind-rav"></div></div><div class="Nicole-mu-time-disp">累计听歌: <span id="Nc-mutime-val">0</span> 分钟</div><div class="Nicole-mu-now Nicole-jmunow" style="text-align:center;font-size:13px;color:#555;font-weight:400;">未在播放</div><div class="Nicole-mu-ctrl"><div class="Nicole-mu-btn Nicole-jmuprev"><svg viewBox="0 0 24 24"><polygon points="19 20 9 12 19 4 19 20" fill="none" stroke="#222" stroke-width="1.5"/><line x1="5" y1="19" x2="5" y2="5" stroke="#222" stroke-width="1.5"/></svg></div><div class="Nicole-mu-btn main Nicole-jmuplay"><svg class="Nicole-jmuicon" viewBox="0 0 24 24"><polygon points="7 4 19 12 7 20 7 4" fill="#222"/></svg></div><div class="Nicole-mu-btn Nicole-jmunext"><svg viewBox="0 0 24 24"><polygon points="5 4 15 12 5 20 5 4" fill="none" stroke="#222" stroke-width="1.5"/><line x1="19" y1="5" x2="19" y2="19" stroke="#222" stroke-width="1.5"/></svg></div></div><div class="Nicole-mu-inp-wrap"><input type="text" class="Nicole-mu-name Nicole-jmuname" placeholder="歌曲名称"><input type="text" class="Nicole-mu-artist Nicole-jmuartist" placeholder="歌手名"></div><div class="Nicole-mu-inp-wrap" style="margin-top:-8px;"><input type="text" class="Nicole-mu-cover Nicole-jmucover" placeholder="专辑封面URL直链 (可选)"></div><div class="Nicole-mu-inp-wrap" style="margin-top:-8px;"><input type="text" class="Nicole-mu-inp Nicole-jmuinp" placeholder="单曲直链或网易云ID"><button class="Nicole-mu-add Nicole-jmuaddbtn">添加</button></div><div class="Nicole-mu-list Nicole-jmulist"></div><button class="Nicole-mu-invbtn Nicole-jmuinv">发送一起听歌邀请</button></div></div></div><div class="Nicole-mf Nicole-jcpmodal"><div class="Nicole-mbox"><div class="Nicole-mh"><span>情侣空间</span><div class="Nicole-mc Nicole-jcpclose">&times;</div></div><div class="Nicole-cp"><div class="Nicole-cp-top"><div class="Nicole-cp-avs"><div class="Nicole-cp-face Nicole-bind-lav"></div><div class="Nicole-cp-face Nicole-jcpf2 Nicole-bind-rav"></div></div><div class="Nicole-cp-id-group"><span class="Nicole-bind-lnm"></span> & <span class="Nicole-bind-rnm"></span></div></div><div class="Nicole-cp-rel Nicole-jcprel"></div><div class="Nicole-cp-sec"><div class="Nicole-cp-h"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#222" stroke-width="1.5"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg> 个性签名</div><div class="Nicole-sign-mod"><div class="Nicole-sign-hd"><div class="Nicole-cp-face Nicole-bind-lav" style="width:30px;height:30px;border-width:.5px;"></div><div class="Nicole-cp-id-group Nicole-bind-lnm" style="font-size:12px;"></div></div><div class="Nicole-sign-bd Nicole-jcsign"></div></div><div class="Nicole-sign-mod" style="margin-top:12px; background:rgba(255,255,255,.9); border:.5px solid rgba(0,0,0,.03);"><div class="Nicole-sign-hd"><div class="Nicole-cp-face Nicole-bind-rav" style="width:30px;height:30px;margin-left:0;border-width:.5px;"></div><div class="Nicole-cp-id-group Nicole-bind-rnm" style="font-size:12px;"></div><div class="Nicole-signdel Nicole-jsigndel" title="删除个签"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg></div></div><div class="Nicole-sign-bd Nicole-jusign-disp"></div><div class="Nicole-sign-act"><input type="text" class="Nicole-jusignin" placeholder="输入新签名..."><button class="Nicole-jusignsave">发布更新</button></div></div></div><div class="Nicole-cp-sec"><div class="Nicole-cp-h"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#222" stroke-width="1.5"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> 想做的小事</div><div class="Nicole-cp-things Nicole-jcpthings"></div><div class="Nicole-cp-addrow"><select class="Nicole-jcpwho"><option value="Me">我</option><option value="You">对方</option></select><input type="text" class="Nicole-jcpthingin" placeholder="添加待办..."><button class="Nicole-jcpthingadd">加</button></div></div><div class="Nicole-cp-sec"><div class="Nicole-cp-h"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#222" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg> 纪念日</div><div class="Nicole-cp-days Nicole-jcpdays"></div><div class="Nicole-cp-addrow"><input type="text" class="Nicole-jcpdayname" placeholder="事件名称"><input type="date" class="Nicole-jcpdaydate"><button class="Nicole-jcpdayadd">加</button></div></div><div class="Nicole-cp-sec"><div class="Nicole-cp-h"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#222" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg> 相册与图文</div><div class="Nicole-cp-albums Nicole-jcpalbums"></div><div class="Nicole-cp-addrow"><input type="text" class="Nicole-jcpalbumtxt" placeholder="这一刻的想法..." style="min-width:30px;"><input type="text" class="Nicole-jcpalbumimg" placeholder="图片URL直链(可选)" style="min-width:50px;"><button class="Nicole-jcpalbumadd">上传</button></div></div></div></div></div></div></div></div>

<div id="Nc-Data-1" style="display:none;">$1</div><div id="Nc-Data-2" style="display:none;">$2</div><div id="Nc-Data-3" style="display:none;">$3</div><div id="Nc-Data-4" style="display:none;">$4</div><div id="Nc-Data-5" style="display:none;">$5</div><div id="Nc-Data-6" style="display:none;">$6</div><div id="Nc-Data-7" style="display:none;">$7</div><div id="Nc-Data-8" style="display:none;">$8</div><div id="Nc-Data-9" style="display:none;">$9</div><div id="Nc-Data-10" style="display:none;">$10</div><div id="Nc-Data-11" style="display:none;">$11</div><div id="Nc-Data-12" style="display:none;">$12</div><div id="Nc-Data-13" style="display:none;">$13</div><div id="Nc-Data-14" style="display:none;">$14</div><div id="Nc-Data-15" style="display:none;">$15</div></div>`;
function getTavernChar(){
    try{
        var name='';
        // 只获取名字，头像交给 char-avatar 类的自动填充机制
        if(window.character) name=window.character.name||window.character.char_name||'';
        if(window.currentCharacter&&!name) name=window.currentCharacter.name||'';
        if(!name){
            var sels=['.char-name','#ch_name','.character-name','#character_name','[class*="char-name"]','[class*="charName"]','.chat-header-name','.character_card_name','[data-testid*="char"]'];
            for(var i=0;i<sels.length;i++){
                var el=document.querySelector(sels[i]);
                if(el&&el.textContent&&el.textContent.trim()&&el.textContent.trim().length<30&&el.textContent.trim()!=='SillyTavern'&&el.textContent.trim()!=='Mufy'){
                    name=el.textContent.trim();break;
                }
            }
        }
        console.log('[Nicole] char name:', name);
        return {name:name||'',avatar:''};
    }catch(e){return {name:'',avatar:''};}
}
function getTavernUser(){
    try{
        var name=window.user_name||window.userName||'';
        if(!name){
            var un=document.querySelector('.user-name,#user_name,[class*="user-name"],[class*="userName"]');
            if(un&&un.textContent&&un.textContent.trim()) name=un.textContent.trim();
        }
        console.log('[Nicole] user name:', name);
        return {name:name||'我',avatar:''};
    }catch(e){return {name:'我',avatar:''};}
}

function buildExtension(){
    if(document.getElementById(FLOAT_ID)){console.log('[nicoPhone] 浮动按钮已存在，跳过');return {panel:document.getElementById(PANEL_ID),floatEl:document.getElementById(FLOAT_ID),btn:document.getElementById(TOGGLE_ID)};}
    if(!document.body){console.error('[nicoPhone] document.body不存在');return null;}
    // inject css
    try{
        if(!document.getElementById(CSS_ID)){
            var st=document.createElement('style');
            st.id=CSS_ID;
            st.textContent=CSS;
            (document.head||document.documentElement).appendChild(st);
        }
    }catch(e){console.error('[nicoPhone] CSS注入失败:',e);}
    // float container
    var floatEl=document.createElement('div');
    floatEl.id=FLOAT_ID;
    // toggle button
    var btn=document.createElement('div');
    btn.id=TOGGLE_ID;
    btn.title='Nicole 手机';
    btn.innerHTML='<svg viewBox="0 0 24 24"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>';
    // panel
    var panel=document.createElement('div');
    panel.id=PANEL_ID;
    panel.innerHTML=HTML;
    floatEl.appendChild(panel);
    floatEl.appendChild(btn);
    // 添加到html标签，避免body的transform影响fixed定位
    (document.documentElement||document.body).appendChild(floatEl);

    // 动态计算位置，用left/top而不是bottom/right，避免transform影响
    function positionFloatBtn(){
    if (window.innerWidth <= 768) return; // 移动端不执行任何JS定位，完全依靠CSS居中
    var btnW=48, btnH=48, left, top;
    try{
        var panel=document.getElementById(PANEL_ID);
        if(panel&&panel.classList.contains('show')) return;
        var input=null, maxTop=0;
        var cands=document.querySelectorAll('#txt_prompt,#txt_prompt_wrap,[class*="input-group"],[class*="input-area"],[class*="send-message"],textarea');
        for(var i=0;i<cands.length;i++){
            var r=cands[i].getBoundingClientRect();
            if(r.top>window.innerHeight*0.3 && r.top<window.innerHeight && r.width>50){
                if(r.top>maxTop){maxTop=r.top;input=cands[i];}
            }
        }
        if(input){
            var r=input.getBoundingClientRect();
            left=r.right-btnW-10;
            top=r.top-btnH-10;
            if(top<10) top=10;
            if(left<10) left=window.innerWidth-btnW-10;
        }else{
            left=window.innerWidth-btnW-20;
            top=window.innerHeight-btnH-100;
        }
        floatEl.style.cssText='position:fixed!important;left:'+left+'px!important;top:'+top+'px!important;z-index:2147483647!important;display:block!important;width:'+btnW+'px!important;height:'+btnH+'px!important;';
    }catch(e){console.error('[nicoPhone] 定位失败:',e);}
}
    btn.style.cssText='width:48px!important;height:48px!important;border-radius:50%!important;background:rgba(255,255,255,.95)!important;display:flex!important;align-items:center!important;justify-content:center!important;box-shadow:0 4px 16px rgba(0,0,0,.15)!important;cursor:pointer!important;';
    positionFloatBtn();
    window.addEventListener('resize',positionFloatBtn);
    setTimeout(positionFloatBtn,500);
    setTimeout(positionFloatBtn,1500);
    console.log('[nicoPhone] 浮动按钮已创建，位置:',floatEl.getBoundingClientRect());
    // 点击图标：图标消失，手机显示
    btn.addEventListener('click',function(e){
    if(btn._dragged){btn._dragged=false;return;}
    panel.classList.add('show');
    btn.style.display='none'; // 展开时隐藏按钮

    // 手机端：不清空任何样式，让CSS的bottom/right控制定位
    // （已移除清空width/height的逻辑，避免按钮和面板消失）

    // 电脑端修正位置（保持原有逻辑）
    setTimeout(function(){
        if (window.innerWidth <= 768) return;
        try{
            var r=floatEl.getBoundingClientRect();
            var pw=panel.offsetWidth||360, ph=panel.offsetHeight||600;
            var adjLeft=Math.max(0, Math.min(r.left, window.innerWidth-pw));
            var adjTop=Math.max(0, Math.min(r.top, window.innerHeight-ph));
            if(adjLeft!==r.left||adjTop!==r.top){
                floatEl.style.left=adjLeft+'px';
                floatEl.style.top=adjTop+'px';
            }
        }catch(e){}
    },50);
});
    // 拖动变量（保留按钮和面板共用）
    var isDragging=false,startX=0,startY=0,origLeft=0,origTop=0,dragTarget=null;
    function startDrag(e,target){
        // 点击交互元素禁止拖拽，防止按钮误触发
        if (e.target.closest('input, textarea, button, select, a, ' +
            '.Nicole-jchat, .Nicole-jpyqpanel, .Nicole-japp-panel, .Nicole-jset, .Nicole-jcall, ' +
            '.Nicole-jpanel, .Nicole-jrepbar, .Nicole-ft, .Nicole-hd-mid, .Nicole-ubox, ' +
            '.Nicole-waves, .Nicole-icons-rt, .Nicole-icbtn, .Nicole-dock-icon, .Nicole-hd-back, ' +
            '.Nicole-home-screen, .Nicole-ios-statusbar, .Nicole-sticky-note, .Nicole-sticky-textarea, .Nicole-sticky-btn')) {
            return;
        }
        isDragging=true;dragTarget=target;
        var t=e.touches?e.touches[0]:e;
        startX=t.clientX;startY=t.clientY;
        var rect=floatEl.getBoundingClientRect();origLeft=rect.left;origTop=rect.top;
        _dragMoved=false;
        if(!e.touches)e.preventDefault();
    }
    var _dragMoved=false;
    // ===== 完全重写 moveDrag，解决面板拖飞出界问题 =====
    function moveDrag(e){
    if(!isDragging)return;
    var t=e.touches?e.touches[0]:e;
    var dx=t.clientX-startX,dy=t.clientY-startY;
    if(Math.abs(dx)>3||Math.abs(dy)>3){
        if(dragTarget)dragTarget._dragged=true;
        _dragMoved=true;
        var newLeft=origLeft+dx, newTop=origTop+dy;
        // 用 getBoundingClientRect 获取当前真实宽高（面板打开时就是面板尺寸）
        var rect = floatEl.getBoundingClientRect();
        var elW = rect.width;
        var elH = rect.height;
        // 强制边界：不允许任何部分飞出屏幕
        newLeft = Math.max(0, Math.min(newLeft, window.innerWidth - elW));
        newTop = Math.max(0, Math.min(newTop, window.innerHeight - elH));
        floatEl.style.left=newLeft+'px';floatEl.style.top=newTop+'px';
        floatEl.style.right='auto';floatEl.style.bottom='auto';
    }
}
    function endDrag(){
        isDragging=false;dragTarget=null;
        // 绝不重置位置，让面板停留在最后一次拖拽的位置
        // 如果点击按钮时没有拖动，位置保持不变，解决“跳回”问题
    }
    // 按钮拖拽（保留，两边都能拖）
    btn.addEventListener('mousedown',function(e){startDrag(e,btn);});
    btn.addEventListener('touchstart',function(e){startDrag(e,btn);},{passive:true});
    // ===== 面板拖拽（电脑端严格过滤，移动端彻底禁掉） =====
    panel.addEventListener('mousedown',function(e){
        // 移动端直接禁用面板拖拽（保护 inset 居中）
        if (window.innerWidth <= 768) return;
        // 电脑端：点击任何交互元素都禁止拖拽
        var target = e.target;
        if (target.closest('input, textarea, button, select, a, ' +
            '.Nicole-jchat, .Nicole-jpyqpanel, .Nicole-japp-panel, .Nicole-jset, .Nicole-jcall, ' +
            '.Nicole-jpanel, .Nicole-jrepbar, .Nicole-ft, .Nicole-hd-mid, .Nicole-ubox, ' +
            '.Nicole-waves, .Nicole-icons-rt, .Nicole-icbtn, .Nicole-dock-icon, .Nicole-hd-back, ' +
            '.Nicole-home-screen, .Nicole-ios-statusbar, .Nicole-sticky-note, .Nicole-sticky-textarea, .Nicole-sticky-btn, ' +
            '.Nicole-ptab, .Nicole-dial-key, .Nicole-dial-callbtn, .Nicole-contact-detail, .Nicole-c-av, ' +
            '.Nicole-c-input, .Nicole-c-btn, .Nicole-list-item, .Nicole-pyq-cover, .Nicole-pyq-uav, ' +
            '.Nicole-pyq-addbtn, .Nicole-pyq-back, .Nicole-pyq-delbtn, .Nicole-pyq-btn, .Nicole-mu-item, ' +
            '.Nicole-mu-btn, .Nicole-mu-add, .Nicole-mu-invbtn, .Nicole-emo-card, .Nicole-emo-gamebtn, ' +
            '.Nicole-cp-thing, .Nicole-cp-addrow button, .Nicole-cp-album-card, .Nicole-loc-send, ' +
            '.Nicole-draw-tools, .Nicole-draw-btn-icon')) {
            return;
        }
        startDrag(e, panel);
    });
    // 移动端触摸面板：彻底禁止拖拽（只靠 CSS inset 居中）
    panel.addEventListener('touchstart',function(e){
        return; // 手机端完全禁用，防止固定定位乱漂
    },{passive:true});
    // 全局鼠标/触屏移动事件
    document.addEventListener('mousemove',moveDrag);
    document.addEventListener('mouseup',endDrag);
    document.addEventListener('touchmove',moveDrag,{passive:true});
    document.addEventListener('touchend',endDrag);
    return {floatEl:floatEl, panel:panel, btn:btn};
}
/* ============ CORE LOGIC (adapted from original) ============ */
function initPhone(scope, charInfo, userInfo){
    var Q=function(s){return scope.querySelector(s);};
    var QA=function(s){return scope.querySelectorAll(s);};

    var rawLAv=charInfo.avatar||'', rawLName=charInfo.name||'角色';
    var rawRAv=userInfo.avatar||'', rawRName=userInfo.name||'我';

    var NcStore={
        get:function(k){try{return localStorage.getItem(k);}catch(e){return null;}},
        set:function(k,v){try{localStorage.setItem(k,v);}catch(e){}}
    };

    function resolveAvatar(rawUrl,isChar){
        if(!rawUrl) return '';
        if(rawUrl.startsWith('http')||rawUrl.startsWith('data:')) return rawUrl;
        try{
            var abs=new URL(rawUrl,window.location.origin).href;
            if(abs) return abs;
        }catch(e){}
        try{
            if(isChar){
                var cImg=document.querySelector('#avatar,.char-avatar img,.avatar img,img.avatar,.character-avatar img');
                if(cImg&&cImg.src) return cImg.src;
            }else{
                var uImg=document.querySelector('#user_avatar,.user-avatar img,.user-icon img,.user-avatar,.user-avatar-icon img');
                if(uImg&&uImg.src) return uImg.src;
            }
        }catch(e){}
        return rawUrl;
    }

    finalLName=rawLName||'Unknown';
    finalRName=rawRName||'Unknown';
    finalLAv=resolveAvatar(rawLAv,true)||'';
    finalRAv=resolveAvatar(rawRAv,false)||'';
    safeLAv=finalLAv?finalLAv.replace(/"/g,'&quot;').replace(/'/g,'%27'):'';
    safeRAv=finalRAv?finalRAv.replace(/"/g,'&quot;').replace(/'/g,'%27'):'';

    // 先设置名字（如果有）
    QA('.Nicole-bind-lnm').forEach(function(el){el.textContent=finalLName;});
    QA('.Nicole-bind-rnm').forEach(function(el){el.textContent=finalRName;});
    // 从页面真实角色头像复制（不依赖酒馆自动填充，因为浮动容器不在聊天区）
    function syncAvatarsFromPage(){
        try{
            // 找页面上真实的角色头像（排除手机组件内部的）
            var floatEl=document.getElementById(FLOAT_ID);
            var allImgs=document.querySelectorAll('img');
            var bestChar=null,bestCharArea=0;
            var bestUser=null,bestUserArea=0;
            for(var i=0;i<allImgs.length;i++){
                var img=allImgs[i];
                if(floatEl&&floatEl.contains(img)) continue;
                var src=img.src||'';
                if(!src||src.indexOf('data:image/gif')===0||src.indexOf('svg')!==-1) continue;
                var w=img.naturalWidth||img.width||0;
                var h=img.naturalHeight||img.height||0;
                if(w<40||h<40) continue;
                var area=w*h;
                var rect=img.getBoundingClientRect();
                // 角色头像通常在页面上半部分/左侧，用户头像通常在下半部分
                if(rect.top<window.innerHeight*0.6&&area>bestCharArea){
                    bestChar=src;bestCharArea=area;
                }
                if(rect.top>window.innerHeight*0.3&&area>bestUserArea){
                    bestUser=src;bestUserArea=area;
                }
            }
            // 也从 background-image 找
            var allEls=document.querySelectorAll('[class*="avatar"],[id*="avatar"],[class*="Avatar"],[id*="Avatar"]');
            for(var j=0;j<allEls.length;j++){
                var el=allEls[j];
                if(floatEl&&floatEl.contains(el)) continue;
                var bg=window.getComputedStyle(el).backgroundImage;
                var bm=bg.match(/url\(["']?([^"')]+)["']?\)/);
                if(bm&&bm[1]&&bm[1].indexOf('data:image/gif')===-1&&bm[1].length>20){
                    var r2=el.getBoundingClientRect();
                    var a2=(el.offsetWidth||40)*(el.offsetHeight||40);
                    if(r2.top<window.innerHeight*0.6&&a2>bestCharArea){bestChar=bm[1];bestCharArea=a2;}
                    if(r2.top>window.innerHeight*0.3&&a2>bestUserArea){bestUser=bm[1];bestUserArea=a2;}
                }
            }
            // 手动上传的头像优先，不被DOM抓取覆盖
            var mAvL='',mAvR='';
            try{mAvL=localStorage.getItem('Nc-av-left')||'';mAvR=localStorage.getItem('Nc-av-right')||'';}catch(e){}
            if(bestChar&&!mAvL){
                safeLAv=bestChar.replace(/'/g,'%27');
                QA('.Nicole-bind-lav, .Nicole-bind-lav-bg').forEach(function(el){el.style.backgroundImage="url('"+safeLAv+"')";});
            }
            if(bestUser&&!mAvR){
                safeRAv=bestUser.replace(/'/g,'%27');
                QA('.Nicole-bind-rav, .Nicole-bind-rav-bg').forEach(function(el){el.style.backgroundImage="url('"+safeRAv+"')";});
            }
            // 找角色名
            if(!finalLName||finalLName==='角色'||finalLName==='Unknown'){
                var nameSels=['.char-name','#ch_name','.character-name','#character_name','[class*="char-name"]','[class*="charName"]','.chat-header-name','.character_card_name','[data-testid*="char"]','.profile_name','.char_profile_name'];
                for(var k=0;k<nameSels.length;k++){
                    var nel=document.querySelector(nameSels[k]);
                    if(nel&&nel.textContent&&nel.textContent.trim()&&nel.textContent.trim().length<30&&nel.textContent.trim()!=='SillyTavern'&&nel.textContent.trim()!=='Mufy'){
                        finalLName=nel.textContent.trim();
                        QA('.Nicole-bind-lnm').forEach(function(el){el.textContent=finalLName;});
                        break;
                    }
                }
            }
            console.log('[Nicole] syncFromPage: charAv='+(bestChar||'none').substring(0,50)+' userAv='+(bestUser||'none').substring(0,50)+' name='+finalLName);
        }catch(e){console.log('[Nicole] syncAvatars error:',e);}
    }
    // 立即同步 + 延迟同步 + 持续同步
    syncAvatarsFromPage();
    setTimeout(syncAvatarsFromPage,500);
    setTimeout(syncAvatarsFromPage,1500);
    if(!window.NcAvatarSyncTimer){
        window.NcAvatarSyncTimer=setInterval(syncAvatarsFromPage,3000);
    }

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
    // ===== 输入框粘贴格式自动转换 =====
    function setupPasteConverter(){
        var inputEl=document.querySelector('#send_textarea')||document.querySelector('.commentInput')||document.querySelector('textarea');
        if(!inputEl){setTimeout(setupPasteConverter,1000);return;}
        inputEl.addEventListener('paste',function(e){
            var pastedText=(e.clipboardData||window.clipboardData).getData('text');
            if(!pastedText)return;
            e.preventDefault();
            var converted=convertPasteFormat(pastedText);
            // 插入到光标位置
            var start=inputEl.selectionStart||0,end=inputEl.selectionEnd||0;
            inputEl.value=inputEl.value.substring(0,start)+converted+inputEl.value.substring(end);
            inputEl.selectionStart=inputEl.selectionEnd=start+converted.length;
            inputEl.dispatchEvent(new Event('input',{bubbles:true}));
        });
    }
    setupPasteConverter();

    function convertPasteFormat(text){
        // 格式1: $[语音:3"|内容] → [我语音:3"|内容]
        // 格式1: $[表情:url] → [我表情:url]
        // 格式1: $[红包:金额|备注] → [我红包:金额|备注]
        // 格式1: $[转账:金额|说明] → [我转账:金额|说明]
        // 格式1: $[电话:语音] → [我电话:语音]
        // 格式1: $[朋友圈:内容] → [我朋友圈:内容]
        // 格式1: $[拍一拍:肩膀] → [我拍一拍:肩膀]
        // 格式1: $[其他] → [我:其他]（纯文本）
        text=text.replace(/\$\[([^\]]+)\]/g,function(m,p1){
            var type=p1.split(':')[0].split('：')[0];
            var knownTypes=['语音','表情','图片','红包','转账','文字图','文图','定位','收款','退回','退款','电话','朋友圈','拍一拍','拉黑','取消拉黑','加好友','系统','撤回'];
            if(knownTypes.indexOf(type)>=0){
                var fixedP1=p1;
                if(type==='文图') fixedP1='文字图'+p1.substring(2);
                return '[我'+fixedP1+']';
            }
            return '[我:'+p1+']';
        });
        // 格式2: 我 | 222 → [我:222]（纯文本）
        text=text.replace(/^我\s*\|\s*(.+)$/gm,'[我:$1]');
        // 格式3: 角色名 | 内容 → [角色名:内容]
        text=text.replace(/^([^\[\n|]+?)\s*\|\s*(.+)$/gm,function(m,name,content){
            name=name.trim();
            if(name && name!=='我') return '['+name+':'+content+']';
            return m;
        });
        return text;
    }
    setupPasteConverter();

    function getRealImgUrl(url){if(url&&url.startsWith('local-draw-')){return NcStore.get('Nc-'+url)||url;}return url;}

    var homeScreen=Q('.Nicole-jhome');
    if(homeScreen) homeScreen.classList.add('active');
    var appPanel=Q('.Nicole-japp-panel');
    var phoneContent=Q('#phone-content');
    var phoneContacts=[{id:'1',name:finalLName,phone:'13800138000'},{id:'2',name:finalRName+' (我)',phone:'13900139000'}];
    var phoneHistory=[];

    setInterval(function(){var d=new Date();var t=Q('.Nicole-jhome-time');if(t)t.textContent=String(d.getHours()).padStart(2,'0')+':'+String(d.getMinutes()).padStart(2,'0');},1000);

    var stickyTxt=Q('.Nicole-jsticky-txt'),stickyBtn=Q('.Nicole-jsticky-save');
    if(stickyTxt&&stickyBtn){
        var savedSticky=NcStore.get('Nc-sticky-note');
        if(savedSticky)stickyTxt.value=savedSticky;
        stickyBtn.addEventListener('click',function(){var val=stickyTxt.value;NcStore.set('Nc-sticky-note',val);playSwoosh();appendCmd('$[更新便签:'+val+']');renderSysMsg('主界面便签已更新并同步');stickyTxt.blur();});
    }

    Q('.Nicole-jhd-back').addEventListener('click',function(){
        var cls=Q('.Nicole-jchatlist-screen');
        if(cls){renderChatListScreen();cls.classList.add('show');}
    });
    Q('#app-wechat').addEventListener('click',function(){if(homeScreen)homeScreen.classList.remove('active');renderChatListScreen();var cls=Q('.Nicole-jchatlist-screen');if(cls)cls.classList.add('show');});
    Q('.Nicole-japp-back').addEventListener('click',function(){appPanel.classList.remove('show');});
    Q('#app-phone').addEventListener('click',function(){appPanel.classList.add('show');renderPhoneTab('recents');});
    QA('.Nicole-ptab').forEach(function(tab){tab.addEventListener('click',function(){QA('.Nicole-ptab').forEach(function(t){t.classList.remove('active');});this.classList.add('active');renderPhoneTab(this.getAttribute('data-target'));});});

    function renderPhoneTab(tabType){
        phoneContent.innerHTML='';
        if(tabType==='recents'){
            if(phoneHistory.length===0){phoneContent.innerHTML='<div style="text-align:center;padding-top:100px;color:#aaa;font-size:14px;">暂无通话记录</div>';}
            else{var html='';phoneHistory.forEach(function(h){html+='<div class="Nicole-list-item"><div><div class="Nicole-item-title" style="color:'+(h.type==='out'?'#222':'#555')+';">'+h.name+'</div><div class="Nicole-item-sub">手机 - '+h.time+'</div></div><div class="Nicole-item-arrow"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg></div></div>';});phoneContent.innerHTML=html;}
        }else if(tabType==='contacts'){
            var cHtml='';phoneContacts.forEach(function(c,i){cHtml+='<div class="Nicole-list-item j-contact" data-idx="'+i+'"><div class="Nicole-item-title">'+c.name+'</div></div>';});phoneContent.innerHTML=cHtml;
            QA('.j-contact').forEach(function(el){el.addEventListener('click',function(){var idx=parseInt(this.getAttribute('data-idx'));renderContactDetail(phoneContacts[idx],idx);});});
        }else if(tabType==='dialpad'){
            var dHtml='<div style="text-align:center;font-size:32px;font-weight:300;margin:30px 0 20px;height:40px;letter-spacing:2px;color:#222;" id="dial-disp"></div><div class="Nicole-dial-grid">';
            var keys=['1','2','3','4','5','6','7','8','9','*','0','#'];keys.forEach(function(k){dHtml+='<div class="Nicole-dial-key">'+k+'</div>';});
            dHtml+='</div><div class="Nicole-dial-callbtn"><svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg></div>';
            phoneContent.innerHTML=dHtml;var ddisp=Q('#dial-disp');
            QA('.Nicole-dial-key').forEach(function(el){el.addEventListener('click',function(){ddisp.textContent+=this.textContent;playSwoosh();});});
            Q('.Nicole-dial-callbtn').addEventListener('click',function(){var num=ddisp.textContent;if(!num)return;var matchContact=phoneContacts.find(function(c){return c.phone===num;});triggerCall(matchContact?matchContact.name:num,num);});
        }
    }
    function renderContactDetail(contact,idx){
        var avLtr=contact.name.charAt(0).toUpperCase();
        var html='<div class="Nicole-contact-detail"><div class="Nicole-c-av-wrap"><div class="Nicole-c-av">'+avLtr+'</div></div><div class="Nicole-c-input-grp"><label>姓名</label><input type="text" class="Nicole-c-input" id="c-edit-name" value="'+contact.name+'"></div><div class="Nicole-c-input-grp"><label>手机号</label><input type="text" class="Nicole-c-input" id="c-edit-phone" value="'+contact.phone+'"></div><div class="Nicole-c-btns"><button class="Nicole-c-btn save j-c-save">保存</button><button class="Nicole-c-btn call j-c-call">呼叫</button></div></div>';
        phoneContent.innerHTML=html;
        Q('.j-c-save').addEventListener('click',function(){var nn=Q('#c-edit-name').value.trim();var np=Q('#c-edit-phone').value.trim();if(nn&&np){phoneContacts[idx].name=nn;phoneContacts[idx].phone=np;playSwoosh();renderPhoneTab('contacts');}});
        Q('.j-c-call').addEventListener('click',function(){triggerCall(contact.name,contact.phone);});
    }
    function triggerCall(name,num){
        phoneHistory.unshift({name:name,phone:num,time:nowTime(),type:'out'});
        appPanel.classList.remove('show');homeScreen.classList.remove('active');
        openCallUI('voice','out');appendCmd(isBlkRight?'$[呼叫失败，拒收]':'[我电话:语音]');
    }

    Q('.Nicole-jhd-toggle').addEventListener('click',function(){Q('.Nicole-jhd').classList.toggle('collapsed');Q('.Nicole-jchat').classList.toggle('collapsed');});
    Q('.Nicole-jset-open').addEventListener('click',function(){Q('.Nicole-jset').classList.add('show');});
    Q('.Nicole-jset-close').addEventListener('click',function(){Q('.Nicole-jset').classList.remove('show');});
    // 手机宽高调节
    var panelEl2=document.getElementById(PANEL_ID);
    var setW=Q('.Nicole-jset-phone-w'),setH=Q('.Nicole-jset-phone-h');
    var savedW=NcStore.get('Nc-phone-w'),savedH=NcStore.get('Nc-phone-h');
    if(savedW&&panelEl2){panelEl2.style.setProperty('--nc-phone-w',savedW+'px','important');if(setW)setW.value=parseInt(savedW);}
    if(savedH&&panelEl2){panelEl2.style.setProperty('--nc-phone-h',savedH+'px','important');if(setH)setH.value=parseInt(savedH);}
    if(setW){setW.addEventListener('change',function(){var w=parseInt(this.value)||360;if(w<240)w=240;if(w>500)w=500;NcStore.set('Nc-phone-w',w);if(panelEl2)panelEl2.style.setProperty('--nc-phone-w',w+'px','important');});}
    if(setH){setH.addEventListener('change',function(){var h=parseInt(this.value)||680;if(h<400)h=400;if(h>900)h=900;NcStore.set('Nc-phone-h',h);if(panelEl2)panelEl2.style.setProperty('--nc-phone-h',h+'px','important');});}
    // 聊天列表
    Q('.Nicole-jchatlist-back').addEventListener('click',function(){var cls=Q('.Nicole-jchatlist-screen');if(cls)cls.classList.remove('show');if(homeScreen)homeScreen.classList.add('active');});
    Q('.Nicole-jchatlist-add').addEventListener('click',function(){Q('.Nicole-jaddchar-modal').classList.add('show');Q('.Nicole-jaddchar-input').value=finalLName||'';});
    Q('.Nicole-jaddchar-cancel').addEventListener('click',function(){Q('.Nicole-jaddchar-modal').classList.remove('show');});
    Q('.Nicole-jaddchar-ok').addEventListener('click',function(){
        var name=Q('.Nicole-jaddchar-input').value.trim();
        if(name){
            var list=JSON.parse(localStorage.getItem('Nc-chat-list')||'[]');
            if(list.indexOf(name)===-1){list.unshift(name);localStorage.setItem('Nc-chat-list',JSON.stringify(list));}
            Q('.Nicole-jaddchar-modal').classList.remove('show');
            // 自动切换到该角色并进入聊天
            if(finalLName) saveChatForChar(finalLName);
            finalLName=name;currentCharName=name;ncManualChar=true;
            loadChatForChar(name);
            scope.querySelectorAll('.Nicole-bind-lnm').forEach(function(el){el.textContent=name;});
            var cls3=Q('.Nicole-jchatlist-screen');
            if(cls3)cls3.classList.remove('show');
            if(homeScreen) homeScreen.classList.remove('active');
            Q('.Nicole-jaddchar-input').value='';
        }
    });
    // 收起手机
    var collapseBtn=Q('.Nicole-jcollapse');
if(collapseBtn){
    collapseBtn.addEventListener('click',function(){
        var p=document.getElementById(PANEL_ID);
        var b=document.getElementById(TOGGLE_ID);
        if(p)p.classList.remove('show');
        if(b){
            b.style.display='flex';
            b.style.opacity='1';
            b.style.visibility='visible';
            // 移动端收起后，不清空任何样式，让CSS控制定位
            // （已移除清空width/height的逻辑，避免按钮消失）
        }
        console.log('[Nicole] 收起手机，图标恢复');
    });
}
    // 清空当前聊天记录
    var clearChatBtn=Q('.Nicole-jclear-chat');
    if(clearChatBtn){clearChatBtn.addEventListener('click',function(){if(!confirm('确定清空当前聊天记录？'))return;var panel=document.getElementById(PANEL_ID);if(panel){var cb=panel.querySelector('.Nicole-jchat');if(cb)cb.innerHTML='';}var cname=currentCharName||finalLName||'';if(cname){try{var key='Nc-chat-'+cname;localStorage.removeItem(key);}catch(e){}}});}

    var root=Q('.Nicole-root');
    var mainStage=Q('.Nicole-stage');
    var colorMap=[{id:'Nc-wrap',v:'--wrap-bg'},{id:'Nc-hdr',v:'--hdr-bg'},{id:'Nc-pull',v:'--pull-bg'},{id:'Nc-wv',v:'--wv-bg'},{id:'Nc-card',v:'--card-bg'},{id:'Nc-ftr',v:'--ftr-bg'},{id:'Nc-bub',v:'--bub-r'},{id:'Nc-bubl',v:'--bub-l'},{id:'Nc-tm',v:'--txt-main'},{id:'Nc-cdt',v:'--card-txt'},{id:'Nc-cic',v:'--card-ic'},{id:'Nc-hdt',v:'--hdr-txt'},{id:'Nc-hdi',v:'--hdr-ic'},{id:'Nc-sys',v:'--sys-txt'},{id:'Nc-cbubl',v:'--call-bub-l'},{id:'Nc-cbub',v:'--call-bub-r'},{id:'Nc-cbtxt',v:'--call-bub-txt'}];
    colorMap.forEach(function(c){
        try{
            if(!mainStage)return;
            var picker=mainStage.querySelector('[id="'+c.id+'"]');
            var txtInp=mainStage.querySelector('[id="'+c.id+'-txt"]');
            if(picker&&txtInp){
                var savedColor=NcStore.get(c.id);
                if(savedColor){mainStage.style.setProperty(c.v,savedColor,'important');picker.value=(savedColor.length===7)?savedColor:'#ffffff';txtInp.value=savedColor;}
                picker.addEventListener('input',function(){var newColor=this.value;mainStage.style.setProperty(c.v,newColor,'important');txtInp.value=newColor;NcStore.set(c.id,newColor);});
                picker.addEventListener('change',function(){var newColor=this.value;mainStage.style.setProperty(c.v,newColor,'important');NcStore.set(c.id,newColor);});
                txtInp.addEventListener('input',function(){var newColor=this.value.trim();if(/^#[0-9A-Fa-f]{6}$/.test(newColor)){mainStage.style.setProperty(c.v,newColor,'important');picker.value=newColor;}});
                txtInp.addEventListener('change',function(){var newColor=this.value.trim();if(/^#[0-9A-Fa-f]{6}$/.test(newColor)){mainStage.style.setProperty(c.v,newColor,'important');picker.value=newColor;NcStore.set(c.id,newColor);}else{this.value=NcStore.get(c.id)||'#ffffff';}});
            }
        }catch(e){}
    });

    var btnRnd=Q('.Nicole-jav-rnd'),btnSq=Q('.Nicole-jav-sq');
    if(NcStore.get('Nc-av-shape')==='sq'){root.classList.add('av-sq');if(btnRnd)btnRnd.classList.remove('active');if(btnSq)btnSq.classList.add('active');}
    // 加载分开的背景和头像
    var savedHomeBg=NcStore.get('Nc-bg-home');if(savedHomeBg){Q('.Nicole-jhome').style.backgroundImage='url(\''+savedHomeBg.replace(/'/g,'%27')+'\')';}
    var savedChatBg=NcStore.get('Nc-bg-chat');if(savedChatBg){Q('.Nicole-jbg').style.backgroundImage='url(\''+savedChatBg.replace(/'/g,'%27')+'\')';}
    var savedAvL=NcStore.get('Nc-av-left');if(savedAvL){safeLAv=savedAvL.replace(/'/g,'%27');finalLAv=savedAvL;QA('.Nicole-bind-lav,.Nicole-bind-lav-bg').forEach(function(el){el.style.backgroundImage='url(\''+safeLAv+'\')';});}
    var savedAvR=NcStore.get('Nc-av-right');if(savedAvR){safeRAv=savedAvR.replace(/'/g,'%27');finalRAv=savedAvR;QA('.Nicole-bind-rav,.Nicole-bind-rav-bg').forEach(function(el){el.style.backgroundImage='url(\''+safeRAv+'\')';});}
    if(btnRnd&&btnSq){btnRnd.addEventListener('click',function(){root.classList.remove('av-sq');btnRnd.classList.add('active');btnSq.classList.remove('active');NcStore.set('Nc-av-shape','rnd');});btnSq.addEventListener('click',function(){root.classList.add('av-sq');btnSq.classList.add('active');btnRnd.classList.remove('active');NcStore.set('Nc-av-shape','sq');});}

    var btnGlass=Q('.Nicole-jglass-glass'),btnSolid=Q('.Nicole-jglass-solid');
    if(NcStore.get('Nc-glass-mode')==='solid'){root.classList.add('solid-mode');if(btnGlass)btnGlass.classList.remove('active');if(btnSolid)btnSolid.classList.add('active');}
    if(btnGlass&&btnSolid){btnGlass.addEventListener('click',function(){root.classList.remove('solid-mode');btnGlass.classList.add('active');btnSolid.classList.remove('active');NcStore.set('Nc-glass-mode','glass');});btnSolid.addEventListener('click',function(){root.classList.add('solid-mode');btnSolid.classList.add('active');btnGlass.classList.remove('active');NcStore.set('Nc-glass-mode','solid');});}

    var bgUpload=Q('.Nicole-jbg-upload'),bgClear=Q('.Nicole-jbg-clear');
    if(bgUpload){bgUpload.addEventListener('click',function(){var fileInp=document.createElement('input');fileInp.type='file';fileInp.accept='image/*';fileInp.onchange=function(e){var f=e.target.files[0];if(!f)return;var reader=new FileReader();reader.onload=function(re){var b64=re.target.result;NcStore.set('Nc-bg-img',b64);var sfB64=b64.replace(/"/g,'&quot;').replace(/'/g,'%27');QA('.Nicole-jbg,.Nicole-jhome').forEach(function(el){el.style.backgroundImage='url(\''+sfB64+'\')';});if(!Q('.Nicole-jcall').classList.contains('video')){QA('.Nicole-call-vbg').forEach(function(el){el.style.backgroundImage='url(\''+sfB64+'\')';});};};reader.readAsDataURL(f);};fileInp.click();});}
    // 左侧头像上传
    var avLUp=Q('.Nicole-jav-l-upload');
    if(avLUp){avLUp.addEventListener('click',function(){var fi=document.createElement('input');fi.type='file';fi.accept='image/*';fi.onchange=function(e){var f=e.target.files[0];if(!f)return;var r=new FileReader();r.onload=function(re){var b64=re.target.result;NcStore.set('Nc-av-left',b64);safeLAv=b64.replace(/'/g,'%27');finalLAv=b64;QA('.Nicole-bind-lav,.Nicole-bind-lav-bg').forEach(function(el){el.style.backgroundImage='url(\''+safeLAv+'\')';});};r.readAsDataURL(f);};fi.click();});}
    var avLClr=Q('.Nicole-jav-l-clear');
    if(avLClr){avLClr.addEventListener('click',function(){NcStore.set('Nc-av-left','');safeLAv='';finalLAv='';QA('.Nicole-bind-lav,.Nicole-bind-lav-bg').forEach(function(el){el.style.backgroundImage='';});});}
    // 右侧头像上传
    var avRUp=Q('.Nicole-jav-r-upload');
    if(avRUp){avRUp.addEventListener('click',function(){var fi=document.createElement('input');fi.type='file';fi.accept='image/*';fi.onchange=function(e){var f=e.target.files[0];if(!f)return;var r=new FileReader();r.onload=function(re){var b64=re.target.result;NcStore.set('Nc-av-right',b64);safeRAv=b64.replace(/'/g,'%27');finalRAv=b64;QA('.Nicole-bind-rav,.Nicole-bind-rav-bg').forEach(function(el){el.style.backgroundImage='url(\''+safeRAv+'\')';});};r.readAsDataURL(f);};fi.click();});}
    var avRClr=Q('.Nicole-jav-r-clear');
    if(avRClr){avRClr.addEventListener('click',function(){NcStore.set('Nc-av-right','');safeRAv='';finalRAv='';QA('.Nicole-bind-rav,.Nicole-bind-rav-bg').forEach(function(el){el.style.backgroundImage='';});});}
    // 主页背景
    var bgHomeUp=Q('.Nicole-jbg-home-upload');
    if(bgHomeUp){bgHomeUp.addEventListener('click',function(){var fi=document.createElement('input');fi.type='file';fi.accept='image/*';fi.onchange=function(e){var f=e.target.files[0];if(!f)return;var r=new FileReader();r.onload=function(re){var b64=re.target.result;NcStore.set('Nc-bg-home',b64);var sf=b64.replace(/'/g,'%27');Q('.Nicole-jhome').style.backgroundImage='url(\''+sf+'\')';};r.readAsDataURL(f);};fi.click();});}
    var bgHomeClr=Q('.Nicole-jbg-home-clear');
    if(bgHomeClr){bgHomeClr.addEventListener('click',function(){NcStore.set('Nc-bg-home','');Q('.Nicole-jhome').style.backgroundImage='';});}
    // 聊天背景
    var bgChatUp=Q('.Nicole-jbg-chat-upload');
    if(bgChatUp){bgChatUp.addEventListener('click',function(){var fi=document.createElement('input');fi.type='file';fi.accept='image/*';fi.onchange=function(e){var f=e.target.files[0];if(!f)return;var r=new FileReader();r.onload=function(re){var b64=re.target.result;NcStore.set('Nc-bg-chat',b64);var sf=b64.replace(/'/g,'%27');Q('.Nicole-jbg').style.backgroundImage='url(\''+sf+'\')';};r.readAsDataURL(f);};fi.click();});}
    var bgChatClr=Q('.Nicole-jbg-chat-clear');
    if(bgChatClr){bgChatClr.addEventListener('click',function(){NcStore.set('Nc-bg-chat','');Q('.Nicole-jbg').style.backgroundImage='';});}
    if(bgClear){bgClear.addEventListener('click',function(){NcStore.set('Nc-bg-img','none');QA('.Nicole-jbg,.Nicole-jhome').forEach(function(el){el.style.backgroundImage='none';});if(!Q('.Nicole-jcall').classList.contains('video')){QA('.Nicole-call-vbg').forEach(function(el){el.style.backgroundImage='none';});};});}

    var setLnm=Q('.Nicole-jset-lnm'),setRnm=Q('.Nicole-jset-rnm');
    if(setLnm){setLnm.value=finalLName;setLnm.addEventListener('input',function(){finalLName=this.value||'Unknown';ncManualChar=true;QA('.Nicole-bind-lnm').forEach(function(el){el.textContent=finalLName;});});}
    if(setRnm){setRnm.value=finalRName;setRnm.addEventListener('input',function(){finalRName=this.value||'Unknown';QA('.Nicole-bind-rnm').forEach(function(el){el.textContent=finalRName;});});}

    var isBlkRight=false,isBlkLeft=false;window.NcIsBlkRight=function(){return isBlkRight;};window.NcIsBlkLeft=function(){return isBlkLeft;};
    Q('.Nicole-jblk-l').addEventListener('click',function(){isBlkLeft=!isBlkLeft;this.classList.toggle('active',isBlkLeft);renderSysMsg(isBlkLeft?'已被 '+finalLName+' 拉入黑名单':'已将 '+finalRName+' 移出黑名单');});
    Q('.Nicole-jblk-r').addEventListener('click',function(){isBlkRight=!isBlkRight;this.classList.toggle('active',isBlkRight);renderSysMsg(isBlkRight?'已将 '+finalLName+' 加入黑名单':'已将 '+finalLName+' 移出黑名单');});

    Q('.Nicole-jaddfcancel').addEventListener('click',function(){Q('.Nicole-jaddfriendmodal').classList.remove('show');});
    Q('.Nicole-jaddfok').addEventListener('click',function(){var greet=Q('.Nicole-jaddgreet').value.trim()||'你好，我想重新添加你为好友。';playSwoosh();renderSysMsg('已发送好友请求验证');appendCmd('$[发送好友请求:'+greet+']');Q('.Nicole-jaddfriendmodal').classList.remove('show');Q('.Nicole-jaddgreet').value='';});

    QA('.Nicole-uname').forEach(function(el){
        el.setAttribute('contenteditable','true');
        el.addEventListener('keydown',function(e){if(e.key==='Enter'){e.preventDefault();this.blur();}});
        el.addEventListener('blur',function(){var isL=this.closest('.Nicole-jpat-l');var nV=this.textContent.trim();if(isL&&nV&&nV!==finalLName){finalLName=nV;ncManualChar=true;appendCmd('$['+finalRName+' 修改了 '+finalLName+' 的备注:'+nV+']');renderSysMsg(finalRName+' 将 '+finalLName+' 备注修改为 "'+nV+'"');}else if(!isL&&nV&&nV!==finalRName){finalRName=nV;appendCmd('$['+finalRName+' 修改了自己的名字:'+nV+']');renderSysMsg(finalRName+' 将自己的名字修改为 "'+nV+'"');}});
    });

    var langBtn=Q('.Nicole-jlang');var langMap=[{l:'zh-CN',t:'CN'},{l:'en-US',t:'US'}];var langIdx=0;langBtn.addEventListener('click',function(){langIdx=(langIdx+1)%langMap.length;langBtn.textContent=langMap[langIdx].t;});

    var chatBox=Q('.Nicole-jchat');var callBubsBox=Q('.Nicole-jcall-bubs');
    function nowTime(){var d=new Date();return String(d.getHours()).padStart(2,'0')+':'+String(d.getMinutes()).padStart(2,'0');}
    function renderSysMsg(text){var m=document.createElement('div');m.className='Nicole-sys-msg';m.innerHTML=text;chatBox.appendChild(m);setTimeout(function(){chatBox.scrollTop=chatBox.scrollHeight;},60);}
    function renderRight(inner,isRaw,hasErr){
        var row=document.createElement('div');row.className='Nicole-row right'+(hasErr?' has-err':'');
        var body=isRaw?inner:'<div class="Nicole-bub">'+inner+'</div>';
        var avStyle=safeRAv?' style="background-image:url(\''+safeRAv+'\')"':'';
        row.innerHTML='<div class="Nicole-rav Nicole-bind-rav"'+avStyle+'></div><div class="Nicole-ct">'+body+'<div class="Nicole-meta">'+nowTime()+' <span class="Nicole-tick">✓✓</span></div></div><div class="Nicole-err-icon Nicole-jerr" title="消息被拒收">!</div>';
        chatBox.appendChild(row);setTimeout(function(){chatBox.scrollTop=chatBox.scrollHeight;},60);
        if(hasErr){setTimeout(function(){renderSysMsg('对方开启了朋友验证，你还不是他（她）朋友。请先发送朋友验证请求，对方验证通过后，才能聊天。<span class="Nicole-view-rev">发送朋友验证</span>');},150);}
    }

    var curPatTarget='left';
    Q('.Nicole-jpat-l').addEventListener('click',function(e){if(e.target.classList.contains('Nicole-uav')){curPatTarget='left';Q('.Nicole-jpatin').value=finalCPat;Q('.Nicole-jpatmodal').classList.add('show');}});
    Q('.Nicole-jpat-r').addEventListener('click',function(e){if(e.target.classList.contains('Nicole-uav')){curPatTarget='right';Q('.Nicole-jpatin').value=finalUPat;Q('.Nicole-jpatmodal').classList.add('show');}});
    Q('.Nicole-jpatcancel').addEventListener('click',function(){Q('.Nicole-jpatmodal').classList.remove('show');});
    Q('.Nicole-jpatok').addEventListener('click',function(){var p=Q('.Nicole-jpatin').value.trim()||'的肩膀';if(curPatTarget==='left'){finalCPat=p;appendCmd('$['+finalLName+' 的拍一拍后缀设为:'+p+']');}else{finalUPat=p;appendCmd('$['+finalRName+' 的拍一拍后缀设为:'+p+']');}Q('.Nicole-jpatmodal').classList.remove('show');});

    function playAudioNode(bub){if(bub.classList.contains('playing'))return;bub.classList.add('playing');bub.classList.add('open');setTimeout(function(){bub.classList.remove('playing');},2000);}
    function showReplyBar(txt){pendingReply=txt;Q('.Nicole-jreptxt').textContent=txt;Q('.Nicole-jrepbar').classList.add('show');}
    Q('.Nicole-jrepclose').addEventListener('click',function(){pendingReply='';Q('.Nicole-jrepbar').classList.remove('show');});

    var zoom=Q('.Nicole-jtxtzoom'),zoomIn=Q('.Nicole-jtxtzoomin');
    var lastClickTime=0,lastClickTarget=null,targetRevokeRow=null,targetRevokeText='',targetBubNode=null;window.targetTfNode=null;

    chatBox.addEventListener('click',function(e){
        var isErr=e.target.closest('.Nicole-jerr');
        if(isErr){e.stopPropagation();Q('.Nicole-jaddfriendmodal').classList.add('show');return;}
        var pureTf=e.target.closest('.Nicole-j-pure-tf');
        if(pureTf&&!pureTf.classList.contains('got')&&!pureTf.classList.contains('returned')){window.targetTfNode=pureTf;Q('.Nicole-jtfactmodal').classList.add('show');return;}
        var isLav=e.target.closest('.Nicole-lav')||e.target.closest('.Nicole-bind-lav');
        var isRav=e.target.closest('.Nicole-rav')||e.target.closest('.Nicole-bind-rav');
        var isViewRev=e.target.closest('.Nicole-view-rev');
        var auTxtNode=e.target.closest('.Nicole-au-txt');if(auTxtNode){e.stopPropagation();return;}
        var txt=e.target.closest('.Nicole-txt-img');var gift=e.target.closest('.Nicole-gift-card,.Nicole-food-card');var cp=e.target.closest('.Nicole-cp-qacard');var mu=e.target.closest('.Nicole-mu-invite-card,.Nicole-music-share-card');var loc=e.target.closest('.Nicole-loc-card');var auBub=e.target.closest('.Nicole-au');var bub=e.target.closest('.Nicole-bub,.Nicole-img,.Nicole-au,.Nicole-tf,.Nicole-link-card,.Nicole-loc-card,.Nicole-food-card,.Nicole-interact-item');var now=Date.now();
        if(isViewRev){e.stopPropagation();Q('.Nicole-jviewtxt').value=isViewRev.getAttribute('data-txt')||'';Q('.Nicole-jviewmodal').classList.add('show');return;}
        if(auBub){if(lastClickTarget===auBub&&(now-lastClickTime<300)){targetRevokeRow=auBub.closest('.Nicole-row');targetRevokeText=auBub.getAttribute('data-txt')||'[语音]';targetBubNode=auBub;Q('.Nicole-jact-revoke').style.display=(targetRevokeRow&&targetRevokeRow.classList.contains('right'))?'block':'none';Q('.Nicole-jmsgact').classList.add('show');clearTimeout(auBub.playTimer);lastClickTime=0;}else{lastClickTime=now;lastClickTarget=auBub;auBub.playTimer=setTimeout(function(){playAudioNode(auBub);},300);}return;}
        if(bub&&!isLav&&!isRav&&!txt&&!gift&&!cp&&!mu&&!loc&&!pureTf){targetRevokeRow=bub.closest('.Nicole-row');targetRevokeText=bub.innerText||'[复杂内容]';targetBubNode=bub;Q('.Nicole-jact-revoke').style.display=(targetRevokeRow&&targetRevokeRow.classList.contains('right'))?'block':'none';Q('.Nicole-jmsgact').classList.add('show');return;}
        if(isLav||isRav){if(now-lastClickTime<300&&lastClickTarget===e.target){if(isLav){renderSysMsg(finalRName+' 拍了拍 '+finalLName+' '+finalCPat);appendCmd('[我拍一拍:'+finalCPat+']');}else{renderSysMsg(finalRName+' 拍了拍自己 '+finalUPat);appendCmd('[我拍一拍:'+finalUPat+']');}lastClickTime=0;return;}}
        lastClickTime=now;lastClickTarget=(isLav||isRav)?e.target:bub;
        if(txt){zoomIn.innerHTML=txt.innerHTML;zoomIn.className='Nicole-txt-zoom-in txt-img-zoom';zoom.classList.add('show');}else if(gift){zoomIn.innerHTML=gift.innerHTML;zoomIn.className='Nicole-txt-zoom-in gift-zoom';zoom.classList.add('show');}else if(cp){Q('.Nicole-jcpmodal').classList.add('show');}else if(mu){Q('.Nicole-jmumodal').classList.add('show');}else if(loc){Q('.Nicole-jlocmodal').classList.add('show');}
    });

    Q('.Nicole-jact-cancel').addEventListener('click',function(){Q('.Nicole-jmsgact').classList.remove('show');});
    Q('.Nicole-jact-delete').addEventListener('click',function(){if(targetRevokeRow&&confirm('删除这条消息？')){targetRevokeRow.remove();if(finalLName)saveChatForChar(finalLName);}Q('.Nicole-jmsgact').classList.remove('show');});
    Q('.Nicole-jact-reply').addEventListener('click',function(){showReplyBar(targetRevokeText.substring(0,30));Q('.Nicole-jmsgact').classList.remove('show');});
    Q('.Nicole-jtfact-cancel').addEventListener('click',function(){Q('.Nicole-jtfactmodal').classList.remove('show');});
    Q('.Nicole-jtfact-receive').addEventListener('click',function(){if(window.targetTfNode){window.targetTfNode.classList.add('got');window.targetTfNode.querySelector('.Nicole-tf-t').textContent='已收款';var amt=window.targetTfNode.getAttribute('data-amt')||'0.00';appendCmd(isBlkRight?'$[发送失败]':'[我收款:'+amt+']');playSwoosh();}Q('.Nicole-jtfactmodal').classList.remove('show');});
    Q('.Nicole-jtfact-return').addEventListener('click',function(){if(window.targetTfNode){window.targetTfNode.classList.add('returned');window.targetTfNode.querySelector('.Nicole-tf-t').textContent='已退回';var amt=window.targetTfNode.getAttribute('data-amt')||'0.00';appendCmd(isBlkRight?'$[发送失败]':'[我退回:'+amt+']');playSwoosh();}Q('.Nicole-jtfactmodal').classList.remove('show');});
    Q('.Nicole-jact-revoke').addEventListener('click',function(){if(targetRevokeRow&&targetRevokeRow.classList.contains('right')){var m=document.createElement('div');m.className='Nicole-sys-msg';m.innerHTML=finalRName+' 撤回了一条消息 <span class="Nicole-view-rev" data-txt="'+targetRevokeText.replace(/"/g,'&quot;')+'">重新编辑</span>';targetRevokeRow.parentNode.replaceChild(m,targetRevokeRow);appendCmd('$[撤回:'+finalRName+'|'+targetRevokeText+']');}Q('.Nicole-jmsgact').classList.remove('show');});
    Q('.Nicole-jtxtzoom').addEventListener('click',function(e){if(e.target===this)this.classList.remove('show');});
    Q('.Nicole-jviewclose').addEventListener('click',function(){Q('.Nicole-jviewmodal').classList.remove('show');});

    // ===== DRAW =====
    var drawCanvas=Q('.Nicole-jdrawcanvas'),drawCtx=drawCanvas.getContext('2d');var isDrawing=false,lastX=0,lastY=0,isEraser=false;var drawHistory=[];
    function saveDrawState(){drawHistory.push(drawCanvas.toDataURL());if(drawHistory.length>20)drawHistory.shift();}
    function resetDrawBoard(){drawCtx.globalCompositeOperation='source-over';drawCtx.fillStyle='#ffffff';drawCtx.fillRect(0,0,drawCanvas.width,drawCanvas.height);drawHistory=[];}
    Q('.Nicole-jbtn-draw').addEventListener('click',function(){openModal('.Nicole-jdrawmodal');setTimeout(resetDrawBoard,50);});
    function getDrawPos(e){var r=drawCanvas.getBoundingClientRect();var cx=e.touches?e.touches[0].clientX:e.clientX;var cy=e.touches?e.touches[0].clientY:e.clientY;return{x:cx-r.left,y:cy-r.top};}
    function startDraw(e){e.preventDefault();isDrawing=true;saveDrawState();var p=getDrawPos(e);lastX=p.x;lastY=p.y;}
    function runDraw(e){if(!isDrawing)return;e.preventDefault();var p=getDrawPos(e);drawCtx.beginPath();drawCtx.moveTo(lastX,lastY);drawCtx.lineTo(p.x,p.y);drawCtx.globalCompositeOperation=isEraser?'destination-out':'source-over';drawCtx.strokeStyle=Q('.Nicole-jdrawcolor').value;drawCtx.lineWidth=Q('.Nicole-jdrawwidth').value;if(isEraser){drawCtx.lineWidth=Math.max(10,Q('.Nicole-jdrawwidth').value*2);}drawCtx.lineCap='round';drawCtx.lineJoin='round';drawCtx.stroke();lastX=p.x;lastY=p.y;}
    function stopDraw(e){e.preventDefault();isDrawing=false;}
    drawCanvas.addEventListener('mousedown',startDraw);drawCanvas.addEventListener('mousemove',runDraw);drawCanvas.addEventListener('mouseup',stopDraw);drawCanvas.addEventListener('mouseout',stopDraw);drawCanvas.addEventListener('touchstart',startDraw,{passive:false});drawCanvas.addEventListener('touchmove',runDraw,{passive:false});drawCanvas.addEventListener('touchend',stopDraw,{passive:false});
    Q('.Nicole-jdrawclear').addEventListener('click',resetDrawBoard);
    Q('.Nicole-jdrawundo').addEventListener('click',function(){if(drawHistory.length>0){var img=new Image();img.src=drawHistory.pop();img.onload=function(){drawCtx.globalCompositeOperation='source-over';drawCtx.clearRect(0,0,drawCanvas.width,drawCanvas.height);drawCtx.drawImage(img,0,0);};}else{resetDrawBoard();}});
    Q('.Nicole-jdraweraser').addEventListener('click',function(){isEraser=!isEraser;this.style.background=isEraser?'#eeeeee':'';this.style.color=isEraser?'#333':'';});
    Q('.Nicole-jdrawcancel').addEventListener('click',function(){Q('.Nicole-jdrawmodal').classList.remove('show');});
    Q('.Nicole-jdrawok').addEventListener('click',function(){drawCtx.globalCompositeOperation='source-over';var b64=drawCanvas.toDataURL('image/jpeg',0.6);var shortId='local-draw-'+Date.now();try{NcStore.set('Nc-'+shortId,b64);}catch(e){}renderRight('<img src="'+b64+'" class="Nicole-img" alt="手绘涂鸦">',true,isBlkRight);playSwoosh();appendCmd(isBlkRight?'$[发送失败]':'[我表情:'+shortId+']');Q('.Nicole-jdrawmodal').classList.remove('show');});

    // ===== CALL =====
    var callIntv=null,callSec=0,callState='none';
    function formatTime(sec){var m=String(Math.floor(sec/60)).padStart(2,'0');var s=String(sec%60).padStart(2,'0');return m+':'+s;}
    function openCallUI(type,state){
        var c=Q('.Nicole-jcall');c.className='Nicole-call Nicole-jcall show state-'+state+(type==='video'?' video':'');c.style.transform='none';
        if(type==='video'){Q('.Nicole-call-vbg').style.backgroundImage='url(\''+safeRAv+'\')';Q('.Nicole-bind-rav-bg').style.backgroundImage='url(\''+safeLAv+'\')';}
        else{var savedBg=NcStore.get('Nc-bg-img');var defaultBg=window.getComputedStyle(Q('.Nicole-jbg')).backgroundImage;if(savedBg&&savedBg!=='none'){Q('.Nicole-call-vbg').style.backgroundImage='url(\''+savedBg.replace(/'/g,'%27')+'\')';}else if(defaultBg&&defaultBg!=='none'){Q('.Nicole-call-vbg').style.backgroundImage=defaultBg;}else{Q('.Nicole-call-vbg').style.backgroundImage='';}}
        callSec=0;callState=state;clearInterval(callIntv);
        // 清空之前的通话气泡
        try{var callBubs=document.querySelector('.Nicole-jcall-bubs');if(callBubs)callBubs.innerHTML='';}catch(e){}
        var panel=Q('.Nicole-jpanel');var plusBtn=Q('.Nicole-jplus');if(panel)panel.classList.remove('show');if(plusBtn)plusBtn.classList.remove('on');
    }
    function setActiveCall(forceType){
        if(callState==='active')return;callState='active';stopRing();
        var c=Q('.Nicole-jcall');c.classList.remove('state-in','state-out','minimized');c.classList.add('active','show');
        if(forceType==='video'){c.classList.add('video');Q('.Nicole-call-vbg').style.backgroundImage='url(\''+safeRAv+'\')';Q('.Nicole-bind-rav-bg').style.backgroundImage='url(\''+safeLAv+'\')';}
        Q('.Nicole-jcall-timer').textContent='00:00';callSec=0;clearInterval(callIntv);callIntv=setInterval(function(){callSec++;Q('.Nicole-jcall-timer').textContent=formatTime(callSec);},1000);
    }
    function closeCall(){stopRing();clearInterval(callIntv);Q('.Nicole-jcall').classList.remove('show','active','state-in','state-out','video','minimized');callState='none';}
    function addCallBubble(dir,text,doType,callType){
        var box=document.querySelector('.Nicole-jcall-bubs');if(!box)return;
        // 过滤文本：解码HTML实体、移除HTML标签、模板变量、多余空格
        try{
            if(text){
                text=String(text);
                // 解码HTML实体
                text=text.replace(/&#39;/g,"'").replace(/&quot;/g,'"').replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>');
                // 移除HTML标签
                text=text.replace(/<[^>]+>/g,'');
                // 移除+dur+模板变量（带或不带单引号）
                text=text.replace(/'?\+dur\+'?/g,'');
                // 合并空格
                text=text.replace(/\s+/g,' ').trim();
                if(!text) return;
            }
        }catch(e){}
        // 去重：如果和最后一条气泡内容、方向、类型都相同，跳过
        try{
            var lastBub=box.querySelector('.Nicole-cb-wrap:last-child .Nicole-cb');
            if(lastBub&&lastBub.textContent===text&&box.lastElementChild&&box.lastElementChild.className.indexOf(dir)>=0){
                var lastClass=lastBub.className;
                if((callType==='video'&&lastClass.indexOf('cb-video')>=0)||(callType!=='video'&&lastClass.indexOf('cb-voice')>=0)){
                    return;
                }
            }
        }catch(e){}
        var wrap=document.createElement('div');wrap.className='Nicole-cb-wrap '+dir;var bub=document.createElement('div');bub.className='Nicole-cb'+(callType==='video'?' cb-video':' cb-voice');wrap.appendChild(bub);box.appendChild(wrap);
        if(doType){var i=0;var timer=setInterval(function(){if(i<text.length){bub.innerHTML+=text.charAt(i);i++;box.scrollTop=box.scrollHeight;}else{clearInterval(timer);}},60);}else{bub.innerHTML=text;setTimeout(function(){box.scrollTop=box.scrollHeight;},50);}
    }
    window.NcAddCallBubble=addCallBubble;
    Q('.Nicole-jbtn-voice').addEventListener('click',function(){openCallUI('voice','out');appendCmd(isBlkRight?'$[呼叫失败，拒收]':'[我电话:语音]');});
    Q('.Nicole-jbtn-video').addEventListener('click',function(){openCallUI('video','out');appendCmd(isBlkRight?'$[呼叫失败，拒收]':'[我电话:视频]');});
    Q('.Nicole-jcall-cancel').addEventListener('click',function(e){e.stopPropagation();closeCall();appendCmd('$[挂断通话]');});
    Q('.Nicole-jcall-answer').addEventListener('click',function(e){e.stopPropagation();setActiveCall();appendCmd('$[接听通话]');});
    Q('.Nicole-jcall-reject').addEventListener('click',function(e){e.stopPropagation();closeCall();renderRight('<div style="display:flex;align-items:center;gap:6px;"><div style="width:18px;height:18px;display:flex;align-items:center;justify-content:center;color:#666;"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M10.5 4.5l-2-2a2 2 0 0 0-2.83 0l-2 2a2 2 0 0 0 0 2.83l9 9a2 2 0 0 0 2.83 0l2-2a2 2 0 0 0 0-2.83z"/><path d="M14 8h5v5"/><path d="M19 8l-5 5"/></svg></div><span style="font-size:13px;color:#333;">已拒绝</span></div>',false,false);appendCmd('$[拒绝通话]');});
    Q('.Nicole-jcall-end').addEventListener('click',function(e){e.stopPropagation();var dur=formatTime(callSec);closeCall();appendCmd('$[挂断通话:'+dur+']');});
    Q('.Nicole-jcall-send').addEventListener('click',function(e){e.stopPropagation();var t=Q('.Nicole-jcall-in').value.trim();if(t){var isVid=Q('.Nicole-jcall').classList.contains('video');addCallBubble('right',t,false);playSwoosh();appendCmd('[我电话:'+t+']');Q('.Nicole-jcall-in').value='';}});

    var callDragItem=Q('.Nicole-jcall');var cDragging=false,cStartX=0,cStartY=0,cInitX=0,cInitY=0,cxOff=0,cyOff=0,cCurrX=0,cCurrY=0,cDragMoved=false;
    function cDragStart(e){if(!callDragItem.classList.contains('minimized'))return;cStartX=e.type==='touchstart'?e.touches[0].clientX:e.clientX;cStartY=e.type==='touchstart'?e.touches[0].clientY:e.clientY;cInitX=cStartX-cxOff;cInitY=cStartY-cyOff;cDragging=true;cDragMoved=false;}
    function cDrag(e){if(!cDragging)return;var cx=e.type==='touchmove'?e.touches[0].clientX:e.clientX;var cy=e.type==='touchmove'?e.touches[0].clientY:e.clientY;if(Math.abs(cx-cStartX)>5||Math.abs(cy-cStartY)>5)cDragMoved=true;if(cDragMoved)e.preventDefault();cCurrX=cx-cInitX;cCurrY=cy-cInitY;cxOff=cCurrX;cyOff=cCurrY;callDragItem.style.transform='translate3d('+cCurrX+'px,'+cCurrY+'px,0)';}
    function cDragEnd(){cInitX=cCurrX;cInitY=cCurrY;cDragging=false;}
    callDragItem.addEventListener('touchstart',cDragStart,{passive:false});document.addEventListener('touchmove',cDrag,{passive:false});document.addEventListener('touchend',cDragEnd);
    callDragItem.addEventListener('mousedown',cDragStart);document.addEventListener('mousemove',cDrag);document.addEventListener('mouseup',cDragEnd);
    callDragItem.addEventListener('click',function(e){if(this.classList.contains('minimized')&&!cDragMoved){this.classList.remove('minimized');cxOff=0;cyOff=0;this.style.transform='none';}});
    Q('.Nicole-jcall-mini-top').addEventListener('click',function(e){e.stopPropagation();Q('.Nicole-jcall').classList.add('minimized');});

    // ===== EMOJI =====
    var baseEmojiArr=[{i:'https://tuchuang.org.cn/imgs/2026/03/26/8abc1e15982dce90.png',t:'宝宝我惹你了吗？'},{i:'https://tuchuang.org.cn/imgs/2026/03/29/28482bc17ee1902a.png',t:'兄弟，我长得太帅被人打了'},{i:'https://tuchuang.org.cn/imgs/2026/03/29/c8edbc471b99ec2d.png',t:'分享位置，床上'},{i:'https://tuchuang.org.cn/imgs/2026/03/29/108aa5ff7f102a0f.png',t:'听说你要洗澡'},{i:'https://tuchuang.org.cn/imgs/2026/03/29/14bc30cf3153af0f.png',t:'不乘，打屁屁咯'},{i:'https://tuchuang.org.cn/imgs/2026/03/29/f28c9fdf5230efc0.png',t:'你也很为我着迷吧？'},{i:'https://tuchuang.org.cn/imgs/2026/03/29/603a9d2dd3ba1db1.png',t:'偶哭叻，你满意了吧？'},{i:'https://tuchuang.org.cn/imgs/2026/03/29/56d88bd75de484f0.png',t:'电你，在心跳吗？'},{i:'https://tuchuang.org.cn/imgs/2026/03/26/a2350084ec1eb9e1.jpg',t:'淦他妈的，我要吃软饭'},{i:'https://tuchuang.org.cn/imgs/2026/03/26/9638432efdd2a0dc.png',t:'哞哞哒[么么哒]'},{i:'https://tuchuang.org.cn/imgs/2026/03/26/ecc00661053e774d.png',t:'吐舌'},{i:'https://tuchuang.org.cn/imgs/2026/03/26/1a553718ed2b2347.png',t:'这个世界有问题'},{i:'https://tuchuang.org.cn/imgs/2026/03/27/d38af7021b9631f1.png',t:'让我喊出我爱你'},{i:'https://tuchuang.org.cn/imgs/2026/03/27/b68c231476fd9735.png',t:'一张古早叼花漫画图'},{i:'https://tuchuang.org.cn/imgs/2026/03/27/29907ae552edde90.png',t:'一张抽象的人物图'},{i:'https://tuchuang.org.cn/imgs/2026/03/27/a082ed0adae88380.png',t:'一张抽象龙图拿着杯子'},{i:'https://tuchuang.org.cn/imgs/2026/03/27/ca976c11387dc5e8.png',t:'一张龙图鄙夷的表情'},{i:'https://tuchuang.org.cn/imgs/2026/03/27/422696afc246a494.png',t:'一只猴子苍蝇搓手'},{i:'https://tuchuang.org.cn/imgs/2026/03/27/c21b68dbdf340f36.png',t:'一张搞怪龙图'},{i:'https://tuchuang.org.cn/imgs/2026/03/28/f369ba2676f4283c.png',t:'沸羊羊耍帅'},{i:'https://tuchuang.org.cn/imgs/2026/03/28/be2862ca6b4b0c3a.png',t:'一个抽象的简笔画'},{i:'https://tuchuang.org.cn/imgs/2026/03/28/e7362ce1784f5c46.png',t:'我要去找上帝告状'},{i:'https://pic1.imgdb.cn/item/6a4cab64531aaa3c3f265491.jpg',t:'简笔画龙图'},{i:'https://pic1.imgdb.cn/item/6a4caf33531aaa3c3f26590d.jpg',t:'出来亲嘴'}];
    var customEmoStr=NcStore.get('Nc-custom-emos');var customEmoArr=customEmoStr?JSON.parse(customEmoStr):[];
    function renderEmoList(){var all=customEmoArr.concat(baseEmojiArr);var html=all.map(function(x){return '<div class="Nicole-emo-card" data-url="'+x.i+'" data-txt="'+x.t+'"><img class="Nicole-emo-img" src="'+x.i+'"><div class="Nicole-emo-t">'+x.t+'</div></div>';}).join('');Q('.Nicole-jemolist').innerHTML=html;QA('.Nicole-emo-card').forEach(function(c){c.addEventListener('click',function(){renderRight('<img src="'+this.getAttribute('data-url')+'" class="Nicole-img" alt="'+this.getAttribute('data-txt')+'">',true,isBlkRight);playSwoosh();appendCmd(isBlkRight?'!['+this.getAttribute('data-txt')+'](发送失败)':'!['+this.getAttribute('data-txt')+']('+this.getAttribute('data-url')+')');Q('.Nicole-jemomodal').classList.remove('show');});});}
    renderEmoList();
    Q('.Nicole-jaddemobtn').addEventListener('click',function(){Q('.Nicole-jaddemomodal').classList.add('show');Q('.Nicole-jemomodal').classList.remove('show');});
    Q('.Nicole-jaddemocancel').addEventListener('click',function(){Q('.Nicole-jaddemomodal').classList.remove('show');Q('.Nicole-jemomodal').classList.add('show');});
    Q('.Nicole-jaddemook').addEventListener('click',function(){var u=Q('.Nicole-jaddemourl').value.trim(),t=Q('.Nicole-jaddemotxt').value.trim()||'自定义表情';if(u){customEmoArr.unshift({i:u,t:t});NcStore.set('Nc-custom-emos',JSON.stringify(customEmoArr));renderEmoList();Q('.Nicole-jaddemourl').value='';Q('.Nicole-jaddemotxt').value='';}Q('.Nicole-jaddemomodal').classList.remove('show');Q('.Nicole-jemomodal').classList.add('show');});
    Q('.jemo-poke').addEventListener('click',function(){var ic='<div class="Nicole-interact-item Nicole-anim-poke"><svg viewBox="0 0 24 24"><path d="M11 2a2 2 0 0 0-2 2v5H6a2 2 0 0 0-2 2v2c0 4.4 3.6 8 8 8h3a5 5 0 0 0 5-5v-6a2 2 0 0 0-2-2h-3V4a2 2 0 0 0-2-2z"/></svg></div>';renderRight(ic,true,isBlkRight);appendCmd(isBlkRight?'$[发送失败]':'[我拍一拍:戳了戳]');playSwoosh();Q('.Nicole-jemomodal').classList.remove('show');});
    Q('.jemo-dice').addEventListener('click',function(){var pt=Math.floor(Math.random()*6)+1;var dots='';if(pt===1)dots='<circle cx="12" cy="12" r="1.5"/>';else if(pt===2)dots='<circle cx="8.5" cy="8.5" r="1.5"/><circle cx="15.5" cy="15.5" r="1.5"/>';else if(pt===3)dots='<circle cx="8.5" cy="8.5" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="15.5" cy="15.5" r="1.5"/>';else if(pt===4)dots='<circle cx="8.5" cy="8.5" r="1.5"/><circle cx="15.5" cy="15.5" r="1.5"/><circle cx="8.5" cy="15.5" r="1.5"/><circle cx="15.5" cy="8.5" r="1.5"/>';else if(pt===5)dots='<circle cx="8.5" cy="8.5" r="1.5"/><circle cx="15.5" cy="15.5" r="1.5"/><circle cx="8.5" cy="15.5" r="1.5"/><circle cx="15.5" cy="8.5" r="1.5"/><circle cx="12" cy="12" r="1.5"/>';else dots='<circle cx="8.5" cy="7" r="1.5"/><circle cx="15.5" cy="7" r="1.5"/><circle cx="8.5" cy="12" r="1.5"/><circle cx="15.5" cy="12" r="1.5"/><circle cx="8.5" cy="17" r="1.5"/><circle cx="15.5" cy="17" r="1.5"/>';var ic='<div class="Nicole-interact-item Nicole-anim-dice"><svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>'+dots+'</svg></div>';renderRight(ic,true,isBlkRight);appendCmd(isBlkRight?'$[发送失败]':'[我摇骰子:'+pt+'点]');playSwoosh();Q('.Nicole-jemomodal').classList.remove('show');});
    Q('.jemo-rps').addEventListener('click',function(){var arr=['剪刀','石头','布'];var res=arr[Math.floor(Math.random()*3)];var qSvg='';if(res==='剪刀')qSvg='<svg viewBox="0 0 24 24"><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><line x1="20" y1="4" x2="8.12" y2="15.88"/><line x1="14.47" y1="14.48" x2="20" y2="20"/><line x1="8.12" y1="8.12" x2="12" y2="12"/></svg>';else if(res==='石头')qSvg='<svg viewBox="0 0 24 24"><path d="M10 15v-5a2 2 0 0 1 4 0v5"/><path d="M14 15v-4a2 2 0 0 1 4 0v4"/><path d="M6 15v-3a2 2 0 0 1 4 0v3"/><path d="M18 15v-2a2 2 0 0 1 4 0v3c0 4-3 7-7 7H9c-4 0-7-3-7-7v-3a2 2 0 0 1 4 0v4"/></svg>';else qSvg='<svg viewBox="0 0 24 24"><path d="M10 15V4a2 2 0 0 1 4 0v11"/><path d="M14 15V5a2 2 0 0 1 4 0v10"/><path d="M6 15V6a2 2 0 0 1 4 0v9"/><path d="M18 15v-2a2 2 0 0 1 4 0v3c0 4-3 7-7 7H9c-4 0-7-3-7-7V9a2 2 0 0 1 4 0v6"/></svg>';var ic='<div class="Nicole-interact-item Nicole-anim-rps">'+qSvg+'</div>';renderRight(ic,true,isBlkRight);appendCmd(isBlkRight?'$[发送失败]':'[我猜拳:'+res+']');playSwoosh();Q('.Nicole-jemomodal').classList.remove('show');});

    // ===== INPUT & SEND =====
    var textInput=Q('.Nicole-jinput'),sendBtn=Q('.Nicole-jsend');
    function sendText(){var v=textInput.value.trim();if(!v)return;if(pendingReply){renderRight('<div class="Nicole-quote-box">'+pendingReply+'</div>'+v,false,isBlkRight);appendCmd(isBlkRight?'$[拉黑拒收]':'[我:[引用:'+pendingReply+'] '+v+']');Q('.Nicole-jrepclose').click();}else{renderRight(v,false,isBlkRight);appendCmd(isBlkRight?'$[消息被拒收]':'[我:'+v+']');}textInput.value='';playSwoosh();}
    sendBtn.addEventListener('click',sendText);
    textInput.addEventListener('keydown',function(e){if(e.key==='Enter'){e.preventDefault();sendText();}});

    var plusBtn=Q('.Nicole-jplus'),panel=Q('.Nicole-jpanel');
    plusBtn.addEventListener('click',function(){plusBtn.classList.toggle('on');panel.classList.toggle('show');});
    function openModal(sel){Q(sel).classList.add('show');panel.classList.remove('show');plusBtn.classList.remove('on');}

    // ===== ALL MODAL BUTTONS =====
    Q('.Nicole-jgiftbtn').addEventListener('click',function(){openModal('.Nicole-jgiftmodal');});
    Q('.Nicole-jgiftcancel').addEventListener('click',function(){Q('.Nicole-jgiftmodal').classList.remove('show');});
    Q('.Nicole-jlinkbtn').addEventListener('click',function(){openModal('.Nicole-jlinkmodal');});
    Q('.Nicole-jlinkcancel').addEventListener('click',function(){Q('.Nicole-jlinkmodal').classList.remove('show');});
    Q('.Nicole-jtf').addEventListener('click',function(){openModal('.Nicole-jtfmodal');});
    Q('.Nicole-jtfcancel').addEventListener('click',function(){Q('.Nicole-jtfmodal').classList.remove('show');});
    Q('.Nicole-jemo').addEventListener('click',function(){openModal('.Nicole-jemomodal');});
    Q('.Nicole-jemoclose').addEventListener('click',function(){Q('.Nicole-jemomodal').classList.remove('show');});
    Q('.Nicole-jmusic').addEventListener('click',function(){openModal('.Nicole-jmumodal');});
    Q('.Nicole-jmuclose').addEventListener('click',function(){Q('.Nicole-jmumodal').classList.remove('show');});
    Q('.Nicole-jcp').addEventListener('click',function(){openModal('.Nicole-jcpmodal');});
    Q('.Nicole-jcpclose').addEventListener('click',function(){Q('.Nicole-jcpmodal').classList.remove('show');});
    Q('.Nicole-jtxtimg').addEventListener('click',function(){openModal('.Nicole-jtxtimgmodal');});
    Q('.Nicole-jtxtimgcancel').addEventListener('click',function(){Q('.Nicole-jtxtimgmodal').classList.remove('show');Q('.Nicole-jtxtimgin').value='';});
    Q('.Nicole-jimgbtn').addEventListener('click',function(){openModal('.Nicole-jimgmodal');});
    Q('.Nicole-jimgcancel').addEventListener('click',function(){Q('.Nicole-jimgmodal').classList.remove('show');Q('.Nicole-jimgurl').value='';Q('.Nicole-jimgdesc').value='';});
    Q('.Nicole-jbtn-loc').addEventListener('click',function(){openModal('.Nicole-jlocmodal');});
    Q('.Nicole-jlocclose').addEventListener('click',function(){Q('.Nicole-jlocmodal').classList.remove('show');});
    Q('.Nicole-jbtn-food').addEventListener('click',function(){openModal('.Nicole-jfoodmodal');});
    Q('.Nicole-jfoodcancel').addEventListener('click',function(){Q('.Nicole-jfoodmodal').classList.remove('show');});

    Q('.Nicole-jgiftok').addEventListener('click',function(){var pr=Q('.Nicole-jgiftpr').value||'0',desc=Q('.Nicole-jgiftdesc').value||'精美礼物',note=Q('.Nicole-jgiftnote').value||'';renderRight('<div class="Nicole-link-card Nicole-gift-card"><div class="Nicole-link-ic" style="background:rgba(255,255,255,0.6);"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="8" width="18" height="4" rx="1"></rect><path d="M12 8v13"></path><path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"></path><path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5"></path></svg></div><div class="Nicole-tf-info"><div class="Nicole-tf-t">'+desc+'</div><div class="Nicole-tf-a" style="color:var(--sys-txt);">¥ '+parseFloat(pr).toFixed(2)+(note?' - '+note:'')+'</div></div></div>',true,isBlkRight);playSwoosh();appendCmd(isBlkRight?'$[发送失败]':'[我礼物:'+pr+'|'+desc+']');Q('.Nicole-jgiftmodal').classList.remove('show');Q('.Nicole-jgiftpr').value='';Q('.Nicole-jgiftdesc').value='';Q('.Nicole-jgiftnote').value='';});
    Q('.Nicole-jlinkok').addEventListener('click',function(){var url=Q('.Nicole-jlinkurl').value.trim(),title=Q('.Nicole-jlinktitle').value.trim()||'网页链接';if(url){renderRight('<a href="javascript:;" class="Nicole-link-card"><div class="Nicole-link-ic"><svg viewBox="0 0 24 24" stroke="currentColor" fill="none" stroke-width="1.8"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></div><div class="Nicole-tf-info"><div class="Nicole-tf-t">'+title+'</div><div class="Nicole-tf-a" style="color:var(--sys-txt);">'+url+'</div></div></a>',true,isBlkRight);playSwoosh();appendCmd(isBlkRight?'$[发送失败]':'[我链接:'+title+'|'+url+']');Q('.Nicole-jlinkmodal').classList.remove('show');Q('.Nicole-jlinkurl').value='';Q('.Nicole-jlinktitle').value='';}});
    Q('.Nicole-jtfok').addEventListener('click',function(){var amt=Q('.Nicole-jtfamt').value,title=Q('.Nicole-jtftitle').value||'转账';if(amt>0){renderRight('<div class="Nicole-tf Nicole-j-pure-tf" data-amt="'+parseFloat(amt).toFixed(2)+'"><div class="Nicole-tf-ic">¥</div><div class="Nicole-tf-info"><div class="Nicole-tf-t">'+title+'</div><div class="Nicole-tf-a">¥ '+parseFloat(amt).toFixed(2)+'</div><div class="Nicole-tf-f">微信转账</div></div></div>',true,isBlkRight);playSwoosh();appendCmd(isBlkRight?'$[发送失败]':'[我转账:'+parseFloat(amt).toFixed(2)+':'+title+']');Q('.Nicole-jtfmodal').classList.remove('show');Q('.Nicole-jtfamt').value='';Q('.Nicole-jtftitle').value='';}});
    Q('.Nicole-jimgok').addEventListener('click',function(){var url=Q('.Nicole-jimgurl').value.trim(),desc=Q('.Nicole-jimgdesc').value.trim()||'图片';if(url){var realUrl=getRealImgUrl(url);renderRight('<img src="'+realUrl+'" class="Nicole-img" alt="'+desc+'">',true,isBlkRight);playSwoosh();appendCmd(isBlkRight?'$[发送失败]':'[我表情:'+url+']');Q('.Nicole-jimgmodal').classList.remove('show');Q('.Nicole-jimgurl').value='';Q('.Nicole-jimgdesc').value='';}});
    Q('.Nicole-jtxtimgok').addEventListener('click',function(){var txt=Q('.Nicole-jtxtimgin').value.trim();if(txt){renderRight('<div class="Nicole-txt-img">'+txt+'</div>',true,isBlkRight);playSwoosh();appendCmd(isBlkRight?'$[发送失败]':'[我文字图:'+txt+']');Q('.Nicole-jtxtimgmodal').classList.remove('show');Q('.Nicole-jtxtimgin').value='';}});
    Q('.Nicole-jfoodok').addEventListener('click',function(){var shop=Q('.Nicole-jfoodshop').value.trim()||'外卖派送';var items=Q('.Nicole-jfooditems').value.trim()||'神秘大餐';var addr=Q('.Nicole-jfoodaddr').value.trim()||'默认地址';var name=Q('.Nicole-jfoodname').value.trim()||'收件人';var phone=Q('.Nicole-jfoodphone').value.trim()||'138****0000';renderRight('<div class="Nicole-tf Nicole-food-card"><div class="Nicole-food-ic" style="background:rgba(255,255,255,0.6);"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 8h1a4 4 0 1 1 0 8h-1"></path><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"></path><line x1="6" y1="2" x2="6" y2="4"></line><line x1="10" y1="2" x2="10" y2="4"></line><line x1="14" y1="2" x2="14" y2="4"></line></svg></div><div class="Nicole-tf-info"><div class="Nicole-tf-t">'+shop+'</div><div class="Nicole-tf-a" style="color:var(--sys-txt);">'+items+'</div><div class="Nicole-tf-f" style="margin-top:2px;padding-top:2px;">'+addr+'</div></div></div>',true,isBlkRight);playSwoosh();appendCmd(isBlkRight?'$[发送失败]':'[我外卖:'+shop+'|'+items+']');Q('.Nicole-jfoodmodal').classList.remove('show');Q('.Nicole-jfoodshop').value='';Q('.Nicole-jfooditems').value='';Q('.Nicole-jfoodaddr').value='';Q('.Nicole-jfoodname').value='';Q('.Nicole-jfoodphone').value='';});
    Q('.Nicole-jlocsend').addEventListener('click',function(){Q('.Nicole-jlocinputmodal').classList.add('show');});
    Q('.Nicole-jlocincancel').addEventListener('click',function(){Q('.Nicole-jlocinputmodal').classList.remove('show');});
    Q('.Nicole-jlocinok').addEventListener('click',function(){var p=Q('.Nicole-jlocin-pos').value.trim()||'我的位置';var d=Q('.Nicole-jlocin-dist').value.trim()||'未知距离';renderRight('<div class="Nicole-tf Nicole-loc-card"><div class="Nicole-link-ic" style="border-radius:50%;"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg></div><div class="Nicole-tf-info"><div class="Nicole-tf-t">'+p+'</div><div class="Nicole-tf-a" style="color:var(--sys-txt);">'+(d.includes('距离')?d:'距离 '+d)+'</div></div></div>',true,isBlkRight);playSwoosh();appendCmd(isBlkRight?'$[发送失败]':'[我定位:'+p+'|'+(d.includes('距离')?d:'距离 '+d)+']');Q('.Nicole-jlocinputmodal').classList.remove('show');Q('.Nicole-jlocmodal').classList.remove('show');Q('.Nicole-jlocin-pos').value='';Q('.Nicole-jlocin-dist').value='';});

    // ===== VOICE =====
    var micBtn=Q('.Nicole-jmic'),isRec=false,finalTxt='';
    var SR=window.SpeechRecognition||window.webkitSpeechRecognition;
    window.voiceObj=null;
    var mediaRec=null,recStartTime=0;
    var tempVoiceDur=null;
    function voiceBubble(txt,dur){renderRight('<div class="Nicole-au" data-txt="'+txt+'"><div class="Nicole-au-main"><div class="Nicole-au-play"></div><div class="Nicole-au-bars"><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div><div class="Nicole-au-dur">'+dur+'</div></div><div class="Nicole-au-wrap"><div class="Nicole-au-txt">'+txt+'</div></div></div>',true,isBlkRight);playSwoosh();appendCmd(isBlkRight?'$[发送失败]':'[我语音:'+dur+'|'+txt+']');}
    function fallback(err){var modal=Q('.Nicole-jvoicemodal');var txtArea=Q('.Nicole-jvoicetxt');modal.classList.add('show');txtArea.value='';txtArea.placeholder=(err?err+'，':'')+'麦克风降级，请手动输入刚刚语音内容的文字...';setTimeout(function(){txtArea.focus();},100);}
    Q('.Nicole-jvoicecancel').addEventListener('click',function(){Q('.Nicole-jvoicemodal').classList.remove('show');tempVoiceDur=null;});
    Q('.Nicole-jvoiceok').addEventListener('click',function(){var txt=Q('.Nicole-jvoicetxt').value.trim();if(txt){var dur=tempVoiceDur||(Math.max(1,Math.round(txt.length/4))+'"');voiceBubble(txt,dur);}Q('.Nicole-jvoicemodal').classList.remove('show');tempVoiceDur=null;});
    function setupSR(){if(window.voiceObj)return true;if(!SR)return false;try{window.voiceObj=new SR();window.voiceObj.continuous=true;window.voiceObj.interimResults=true;window.voiceObj.onresult=function(ev){for(var i=ev.resultIndex;i<ev.results.length;i++){if(ev.results[i].isFinal)finalTxt+=ev.results[i][0].transcript;}};window.voiceObj.onerror=function(ev){if(ev.error!=='no-speech'){isRec=false;micBtn.classList.remove('rec');fallback(ev.error==='not-allowed'?'权限被拒':'识别被中断');}};window.voiceObj.onend=function(){if(isRec){try{window.voiceObj.start();}catch(e){}}else{micBtn.classList.remove('rec');if(finalTxt.trim())voiceBubble(finalTxt.trim(),Math.max(1,Math.round(finalTxt.length/4))+'"');}};return true;}catch(e){return false;}}
    function startMediaRecord(){if(navigator.mediaDevices&&navigator.mediaDevices.getUserMedia){navigator.mediaDevices.getUserMedia({audio:true}).then(function(stream){var MR=window.MediaRecorder;mediaRec=new MR(stream);mediaRec.onstop=function(){var dur=Math.max(1,Math.round((Date.now()-recStartTime)/1000));stream.getTracks().forEach(function(t){t.stop();});tempVoiceDur=dur+'"';fallback('语音录制完毕 (真实时长: '+dur+'秒)');};recStartTime=Date.now();mediaRec.start();isRec=true;micBtn.classList.add('rec');}).catch(function(){fallback('麦克风被占用或拒绝');});}else{fallback('浏览器环境不支持录音');}}
    micBtn.addEventListener('click',function(e){e.preventDefault();if(isRec){isRec=false;micBtn.classList.remove('rec');if(window.voiceObj){try{window.voiceObj.stop();}catch(err){}}if(mediaRec&&mediaRec.state!=='inactive'){try{mediaRec.stop();}catch(err){}}}else{var isEdgeAndroid=navigator.userAgent.includes('EdgA');if(SR&&!isEdgeAndroid&&setupSR()){finalTxt='';try{window.voiceObj.lang=langMap[langIdx].l;window.voiceObj.start();isRec=true;micBtn.classList.add('rec');}catch(err){isRec=false;micBtn.classList.remove('rec');fallback('引擎启动异常');}}else{startMediaRecord();}}});

    // ===== MUSIC =====
    var muList=[],muIdx=0,muPlaying=false,muIntv=null,muSec=0;
    function renderMuList(){var html=muList.map(function(s,i){return '<div class="Nicole-mu-item'+(i===muIdx?' active':'')+'" data-idx="'+i+'"><span>'+s.name+' - '+s.artist+'</span><span class="jmudel" data-idx="'+i+'">×</span></div>';}).join('');Q('.Nicole-jmulist').innerHTML=html||'<div style="text-align:center;color:#aaa;font-size:12px;padding:20px;">暂无歌曲</div>';QA('.Nicole-mu-item').forEach(function(el){el.addEventListener('click',function(e){if(e.target.classList.contains('jmudel')){e.stopPropagation();var di=parseInt(e.target.getAttribute('data-idx'));muList.splice(di,1);if(muIdx>=muList.length)muIdx=0;renderMuList();return;}muIdx=parseInt(this.getAttribute('data-idx'));playMu();});});}
    function playMu(){if(muList.length===0)return;var s=muList[muIdx];Q('.Nicole-jmunow').textContent=s.name+' - '+s.artist;Q('.Nicole-jmuwaves').classList.add('playing');muPlaying=true;Q('.Nicole-jmuicon').innerHTML='<rect x="6" y="4" width="4" height="16" fill="#222"/><rect x="14" y="4" width="4" height="16" fill="#222"/>';if(s.cover){QA('.Nicole-jmuf1,.Nicole-jmuf2').forEach(function(el){el.style.backgroundImage='url('+s.cover+')';});}muSec=0;clearInterval(muIntv);muIntv=setInterval(function(){muSec++;var el=document.getElementById('Nc-mutime-val');if(el)el.textContent=Math.floor(muSec/60);},1000);}
    function pauseMu(){muPlaying=false;Q('.Nicole-jmuwaves').classList.remove('playing');Q('.Nicole-jmuicon').innerHTML='<polygon points="7 4 19 12 7 20 7 4" fill="#222"/>';clearInterval(muIntv);}
    Q('.Nicole-jmuplay').addEventListener('click',function(){if(muPlaying){pauseMu();}else{playMu();}});
    Q('.Nicole-jmuprev').addEventListener('click',function(){if(muList.length===0)return;muIdx=(muIdx-1+muList.length)%muList.length;playMu();});
    Q('.Nicole-jmunext').addEventListener('click',function(){if(muList.length===0)return;muIdx=(muIdx+1)%muList.length;playMu();});
    Q('.Nicole-jmuaddbtn').addEventListener('click',function(){var name=Q('.Nicole-jmuname').value.trim()||'未命名';var artist=Q('.Nicole-jmuartist').value.trim()||'未知歌手';var cover=Q('.Nicole-jmucover').value.trim();var url=Q('.Nicole-jmuinp').value.trim();muList.push({name:name,artist:artist,cover:cover,url:url});renderMuList();Q('.Nicole-jmuname').value='';Q('.Nicole-jmuartist').value='';Q('.Nicole-jmucover').value='';Q('.Nicole-jmuinp').value='';});
    Q('.Nicole-jmuinv').addEventListener('click',function(){if(muList.length===0){renderSysMsg('请先添加歌曲');return;}var s=muList[muIdx];renderRight('<div class="Nicole-music-share-card"><div class="Nicole-msc-top"><div class="Nicole-msc-cover" style="background-image:url('+(s.cover||'')+')"><div class="Nicole-msc-playic"><svg viewBox="0 0 24 24"><polygon points="7 4 19 12 7 20 7 4"/></svg></div></div><div class="Nicole-msc-info"><div class="Nicole-msc-name">'+s.name+'</div><div class="Nicole-msc-artist">'+s.artist+'</div></div></div><div class="Nicole-msc-bot"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>一起听歌</div></div>',true,isBlkRight);playSwoosh();appendCmd(isBlkRight?'$[发送失败]':'[我听歌:'+s.name+'|'+s.artist+']');Q('.Nicole-jmumodal').classList.remove('show');});
    renderMuList();

    // ===== COUPLE SPACE =====
    var cpThings=JSON.parse(NcStore.get('Nc-cp-things')||'[]');
    var cpDays=JSON.parse(NcStore.get('Nc-cp-days')||'[]');
    var cpAlbums=JSON.parse(NcStore.get('Nc-cp-albums')||'[]');
    function renderCpThings(){var html=cpThings.map(function(t,i){return '<div class="Nicole-cp-thing'+(t.done?' done':'')+'" data-idx="'+i+'"><div class="dot"></div><span>'+(t.who==='Me'?finalRName:finalLName)+': '+t.text+'</span></div>';}).join('');Q('.Nicole-jcpthings').innerHTML=html||'<div style="text-align:center;color:#aaa;font-size:12px;padding:10px;">还没有想做的小事</div>';QA('.Nicole-cp-thing').forEach(function(el){el.addEventListener('click',function(){var idx=parseInt(this.getAttribute('data-idx'));cpThings[idx].done=!cpThings[idx].done;NcStore.set('Nc-cp-things',JSON.stringify(cpThings));renderCpThings();});});}
    function renderCpDays(){var html=cpDays.map(function(d){var dDate=new Date(d.date);var now=new Date();var diff=Math.ceil((now-dDate)/(1000*60*60*24));return '<div class="Nicole-cp-day"><span>'+d.name+'</span><b>'+(diff>=0?diff+'天前':'还有'+Math.abs(diff)+'天')+'</b></div>';}).join('');Q('.Nicole-jcpdays').innerHTML=html||'<div style="text-align:center;color:#aaa;font-size:12px;padding:10px;">还没有纪念日</div>';}
    function renderCpAlbums(){var html=cpAlbums.map(function(a){if(a.img){return '<div class="Nicole-cp-album-card"><div class="Nicole-cp-album-img" style="background-image:url('+a.img+')"></div><div class="Nicole-cp-album-who">'+a.who+'</div><div class="Nicole-cp-album-txt">'+a.txt+'</div></div>';}else{return '<div class="Nicole-cp-album-card"><div class="Nicole-cp-album-txt-only">'+a.txt+'</div></div>';}}).join('');Q('.Nicole-jcpalbums').innerHTML=html||'<div style="text-align:center;color:#aaa;font-size:12px;padding:10px;grid-column:1/-1;">还没有相册</div>';}
    Q('.Nicole-jcpthingadd').addEventListener('click',function(){var text=Q('.Nicole-jcpthingin').value.trim();var who=Q('.Nicole-jcpwho').value;if(text){cpThings.push({text:text,who:who,done:false});NcStore.set('Nc-cp-things',JSON.stringify(cpThings));renderCpThings();Q('.Nicole-jcpthingin').value='';}});
    Q('.Nicole-jcpdayadd').addEventListener('click',function(){var name=Q('.Nicole-jcpdayname').value.trim();var date=Q('.Nicole-jcpdaydate').value;if(name&&date){cpDays.push({name:name,date:date});NcStore.set('Nc-cp-days',JSON.stringify(cpDays));renderCpDays();Q('.Nicole-jcpdayname').value='';Q('.Nicole-jcpdaydate').value='';}});
    Q('.Nicole-jcpalbumadd').addEventListener('click',function(){var txt=Q('.Nicole-jcpalbumtxt').value.trim();var img=Q('.Nicole-jcpalbumimg').value.trim();if(txt||img){cpAlbums.unshift({txt:txt||'图片',img:img,who:finalRName});NcStore.set('Nc-cp-albums',JSON.stringify(cpAlbums));renderCpAlbums();Q('.Nicole-jcpalbumtxt').value='';Q('.Nicole-jcpalbumimg').value='';}});
    var cSign=NcStore.get('Nc-csign')||'';var uSign=NcStore.get('Nc-usign')||'';
    Q('.Nicole-jcsign').textContent=cSign;
    Q('.Nicole-jusign-disp').textContent=uSign;
    Q('.Nicole-jusignsave').addEventListener('click',function(){var val=Q('.Nicole-jusignin').value.trim();if(val){uSign=val;NcStore.set('Nc-usign',val);Q('.Nicole-jusign-disp').textContent=val;Q('.Nicole-jusignin').value='';appendCmd('$[更新个签:'+val+']');}});
    Q('.Nicole-jsigndel').addEventListener('click',function(){uSign='';NcStore.set('Nc-usign','');Q('.Nicole-jusign-disp').textContent='';});
    Q('.Nicole-jcprel').textContent='相恋中 · 永远在一起';
    renderCpThings();renderCpDays();renderCpAlbums();

    // ===== PYQ (朋友圈) =====
    var pyqList=JSON.parse(NcStore.get('Nc-pyq-list')||'[]');
    function renderPyq(){
        var html=pyqList.map(function(p){
            var h='<div class="Nicole-pyq-item" data-id="'+p.id+'"><div class="Nicole-pyq-delbtn jpyqdel" data-id="'+p.id+'" title="删除"><svg viewBox="0 0 24 24"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg></div>';
            var avStyle=p.uav?' style="background-image:url(\''+p.uav.replace(/'/g,'%27')+'\')"':'';
            h+='<div class="Nicole-pyq-iav"'+avStyle+'></div><div class="Nicole-pyq-ict"><div class="Nicole-pyq-inm">'+p.uname+'</div>';
            if(p.txt)h+='<div class="Nicole-pyq-itxt">'+p.txt+'</div>';
            if(p.txtimg)h+='<div class="Nicole-pyq-txtimg Nicole-txt-img">'+p.txtimg+'</div>';
            else if(p.img)h+='<img src="'+getRealImgUrl(p.img)+'" class="Nicole-pyq-iimg">';
            h+='<div class="Nicole-pyq-ibot"><span>'+p.time+'</span><div class="Nicole-pyq-iacts"><div class="Nicole-pyq-btn jpyqlike" data-id="'+p.id+'"><svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>'+(p.likes&&p.likes.length?' '+p.likes.length:'')+'</div><div class="Nicole-pyq-btn jpyqcom" data-id="'+p.id+'"><svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>'+(p.comments&&p.comments.length?' '+p.comments.length:'')+'</div></div></div>';
            if(p.likes&&p.likes.length||p.comments&&p.comments.length){h+='<div class="Nicole-pyq-ints">';if(p.likes&&p.likes.length)h+='<div class="Nicole-pyq-likes"><svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>'+p.likes.join('、')+'</div>';if(p.comments&&p.comments.length){h+='<div class="Nicole-pyq-coms">';p.comments.forEach(function(c){h+='<div class="Nicole-pyq-com"><span>'+c.from+'</span>：'+c.text+'</div>';});h+='</div>';}h+='</div>';}
            h+='</div></div>';return h;
        }).join('');
        Q('.Nicole-jpyqlist').innerHTML=html;
        QA('.jpyqlike').forEach(function(btn){btn.addEventListener('click',function(){var id=this.getAttribute('data-id');var p=pyqList.find(function(x){return x.id===id;});if(!p)return;if(!p.likes)p.likes=[];if(p.likes.indexOf(finalRName)===-1){p.likes.push(finalRName);appendCmd('$[点赞朋友圈]');}else{p.likes=p.likes.filter(function(n){return n!==finalRName;});}NcStore.set('Nc-pyq-list',JSON.stringify(pyqList));renderPyq();});});
        QA('.jpyqcom').forEach(function(btn){btn.addEventListener('click',function(){curPyqIdx=this.getAttribute('data-id');Q('.Nicole-jpyqcomtxt').value='';Q('.Nicole-jpyqcommodal').classList.add('show');});});
        QA('.jpyqdel').forEach(function(btn){btn.addEventListener('click',function(e){e.stopPropagation();var id=this.getAttribute('data-id');pyqList=pyqList.filter(function(x){return x.id!==id;});NcStore.set('Nc-pyq-list',JSON.stringify(pyqList));renderPyq();appendCmd('$[删除朋友圈]');});});
    }
    var curPyqIdx=-1;
    Q('.Nicole-jpyqbtn').addEventListener('click',function(){Q('.Nicole-jpyqpanel').classList.add('show');renderPyq();});
    Q('.Nicole-jpyqback').addEventListener('click',function(){Q('.Nicole-jpyqpanel').classList.remove('show');});
    Q('.Nicole-jpyqadd').addEventListener('click',function(){Q('.Nicole-jpyqsendmodal').classList.add('show');});
    Q('.Nicole-jpyqsendcancel').addEventListener('click',function(){Q('.Nicole-jpyqsendmodal').classList.remove('show');});
    Q('.Nicole-jpyqsendok').addEventListener('click',function(){
        var t=Q('.Nicole-jpyqsendtxt').value.trim();var i=Q('.Nicole-jpyqsendimg').value.trim();var ti=Q('.Nicole-jpyqsendtxtimg').value.trim();
        if(t||i||ti){
            var newId='pyq_'+Date.now();
            var pyqUav=NcStore.get('Nc-pyq-uav')||safeRAv;
            pyqList.unshift({id:newId,txt:t,img:i,txtimg:ti,uname:finalRName,uav:pyqUav,time:'刚刚',likes:[],comments:[]});
            NcStore.set('Nc-pyq-list',JSON.stringify(pyqList));
            appendCmd('[我朋友圈:'+t+'|'+(i?i:(ti?'text:'+ti:''))+']');
            renderPyq();
            Q('.Nicole-jpyqsendmodal').classList.remove('show');
            Q('.Nicole-jpyqsendtxt').value='';Q('.Nicole-jpyqsendimg').value='';Q('.Nicole-jpyqsendtxtimg').value='';
        }
    });
    Q('.Nicole-jpyqcomcancel').addEventListener('click',function(){Q('.Nicole-jpyqcommodal').classList.remove('show');});
    Q('.Nicole-jpyqcomok').addEventListener('click',function(){var t=Q('.Nicole-jpyqcomtxt').value.trim();if(t){var p=pyqList.find(function(x){return x.id===curPyqIdx;});if(p){if(!p.comments)p.comments=[];p.comments.push({from:finalRName,text:t});NcStore.set('Nc-pyq-list',JSON.stringify(pyqList));renderPyq();appendCmd('$[评论朋友圈:'+t+']');}Q('.Nicole-jpyqcommodal').classList.remove('show');Q('.Nicole-jpyqcomtxt').value='';}});
    Q('.Nicole-jpyq-uav').addEventListener('click',function(){var fileInp=document.createElement('input');fileInp.type='file';fileInp.accept='image/*';fileInp.onchange=function(e){var f=e.target.files[0];if(!f)return;var reader=new FileReader();reader.onload=function(re){var b64=re.target.result;NcStore.set('Nc-pyq-uav',b64);Q('.Nicole-jpyq-uav').style.backgroundImage='url('+b64+')';};reader.readAsDataURL(f);};fileInp.click();});
    Q('.Nicole-jpyq-cover').addEventListener('click',function(){var fileInp=document.createElement('input');fileInp.type='file';fileInp.accept='image/*';fileInp.onchange=function(e){var f=e.target.files[0];if(!f)return;var reader=new FileReader();reader.onload=function(re){var b64=re.target.result;NcStore.set('Nc-pyq-cover',b64);Q('.Nicole-jpyq-cover').style.backgroundImage='url('+b64+')';};reader.readAsDataURL(f);};fileInp.click();});
    var savedPyqCover=NcStore.get('Nc-pyq-cover');if(savedPyqCover)Q('.Nicole-jpyq-cover').style.backgroundImage='url('+savedPyqCover+')';
    var savedPyqUav=NcStore.get('Nc-pyq-uav')||safeRAv;if(savedPyqUav)Q('.Nicole-jpyq-uav').style.backgroundImage='url('+savedPyqUav.replace(/'/g,'%27')+')';
    renderPyq();

    // init welcome
    renderSysMsg('Nicole 手机已连接 · '+finalLName);
}

/* ============ MAIN INIT & CHAR SWITCH ============ */
var finalLName='',finalRName='',finalLAv='',finalRAv='',safeLAv='',safeRAv='',currentCharName='',currentChatId2='',ncManualChar=false;
var currentCharName='';
async function doInit(){
    try{
        console.log('[nicoPhone] 初始化开始');
        var built=buildExtension();
        if(!built){console.log('[nicoPhone] 已加载，跳过');return;}
        var charInfo=getTavernChar();
        var userInfo=getTavernUser();
        // triggerSlash 加超时，防止移动端卡住
        function triggerSafe(cmd){
            return new Promise(function(resolve){
                var done=false;
                var timer=setTimeout(function(){if(!done){done=true;resolve(null);}},2500);
                try{
                    var p=triggerSlash(cmd);
                    if(p&&typeof p.then==='function'){
                        p.then(function(r){if(!done){done=true;clearTimeout(timer);resolve(r);}}).catch(function(){if(!done){done=true;clearTimeout(timer);resolve(null);}});
                    }else{if(!done){done=true;clearTimeout(timer);resolve(p);}}
                }catch(e){if(!done){done=true;clearTimeout(timer);resolve(null);}}
            });
        }
        if(typeof triggerSlash==='function'){
            var cn=await triggerSafe('/pass {{char}}');
            if(cn&&cn.trim())charInfo.name=cn.trim();
            var ca=await triggerSafe('/pass {{charAvatarPath}}');
            if(ca&&ca.trim())charInfo.avatar=ca.trim();
            var un=await triggerSafe('/pass {{user}}');
            if(un&&un.trim())userInfo.name=un.trim();
            var ua=await triggerSafe('/pass {{userAvatarPath}}');
            if(ua&&ua.trim())userInfo.avatar=ua.trim();
        }
        currentCharName=charInfo.name;
        // 先显示浮动按钮，确保即使面板初始化失败也能看到
        try{
            if(typeof positionFloatBtn==='function') positionFloatBtn();
            built.floatEl.style.display='block';
            built.btn.style.display='flex';
            console.log('[nicoPhone] 浮动按钮位置:',built.floatEl.getBoundingClientRect());
        }catch(e){console.error('[nicoPhone] 显示浮动按钮失败:',e);}
        try{
            initPhone(built.panel,charInfo,userInfo);
            console.log('[nicoPhone] 初始化完成，角色：'+charInfo.name);
        }catch(e){
            console.error('[nicoPhone] 面板初始化错误:',e);
        }
        window.NcAPI={
            openCallUI:function(type,dir){try{var call=document.querySelector('.Nicole-jcall');if(call){call.classList.remove('state-out','state-in','video');call.classList.add(dir==='in'?'state-in':'state-out');if(type==='video')call.classList.add('video');call.classList.add('show');var st=call.querySelector('.Nicole-jcall-st');if(st)st.textContent=dir==='in'?'对方发起通话...':'正在呼叫...';var nm=call.querySelector('.Nicole-jcall-nm');if(nm)nm.textContent=finalLName;}}catch(e){}},
            addPyq:function(txt,img){try{var modal=document.querySelector('.Nicole-jpyqsendtxt');if(modal)modal.value=txt||'';var imgInp=document.querySelector('.Nicole-jpyqsendimg');if(imgInp)imgInp.value=img||'';var btn=document.querySelector('.Nicole-jpyqsendok');if(btn)btn.click();}catch(e){}},
            renderSysMsg:function(txt){try{renderSysMsg(txt);}catch(e){}}
        };
        startStoryListener();
        // 浮动按钮已在前面显示，这里只做日志
        console.log('[nicoPhone] 浮动按钮已显示');
    }catch(e){
        console.error('[nicoPhone] 初始化错误:',e);
    }
}
var currentChatId2='';
function checkCharSwitch(){
    try{
        var charInfo=getTavernChar();
        // 从页面获取真实角色名（比 getTavernChar 更可靠）
        var realName='';
        var nameSels=['.char-name','#ch_name','.character-name','#character_name','[class*="char-name"]','[class*="charName"]','.chat-header-name','.character_card_name','[data-testid*="char"]','.profile_name'];
        for(var i=0;i<nameSels.length;i++){
            var nel=document.querySelector(nameSels[i]);
            if(nel&&nel.textContent&&nel.textContent.trim()&&nel.textContent.trim().length<30&&nel.textContent.trim()!=='SillyTavern'&&nel.textContent.trim()!=='Mufy'){
                realName=nel.textContent.trim();break;
            }
        }
        var chatId=window.chat_id||window.location.hash||'';
        var nameChanged=(realName&&realName!==currentCharName);
        var chatChanged=(chatId&&chatId!==currentChatId2);
        if(nameChanged||chatChanged){
            // 如果是从聊天列表手动选择的角色，不自动切换
            if(ncManualChar){
                console.log('[Nicole] 手动选择角色模式，跳过自动切换: current='+currentCharName+' detected='+realName);
                currentChatId2=chatId;
                return;
            }
            console.log('[Nicole] 切换检测: name='+currentCharName+'→'+realName+' chat='+currentChatId2+'→'+chatId);
            var panel=document.getElementById(PANEL_ID);
            if(panel){
                // 切换前保存当前角色记录
                if(currentCharName) saveChatForChar(currentCharName);
                panel.innerHTML=HTML;
                var userInfo=getTavernUser();
                currentCharName=realName||charInfo.name;
                currentChatId2=chatId;
                initPhone(panel,{name:realName||charInfo.name,avatar:''},userInfo);
                // 切换后加载新角色记录
                setTimeout(function(){loadChatForChar(currentCharName);},100);
            }
        }
    }catch(e){console.log('[Nicole] checkCharSwitch error:',e);}
}

// wait for DOM ready
// 健壮的初始化：等待document.body准备好，多次尝试
function safeInit(){
    try{
        if(!document.body){setTimeout(safeInit,100);return;}
        doInit();
    }catch(e){
        console.error('[nicoPhone] safeInit错误:',e);
        setTimeout(safeInit,500);
    }
}
if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',safeInit);
}else{
    safeInit();
}
// poll for char switch every 2 seconds
setInterval(checkCharSwitch,2000);

// 多重兜底：1秒、3秒、5秒、10秒后检查浮动按钮
[1000,3000,5000,10000].forEach(function(t){
    setTimeout(function(){
        var f=document.getElementById('nicole-float');
        if(!f){
            console.warn('[nicoPhone] '+t+'ms 浮动按钮未创建，重试');
            try{safeInit();}catch(e){console.error('[nicoPhone] 重试失败:',e);}
        }else{
            f.style.display='block';
            var btn=document.getElementById('nicole-toggle-btn');
            if(btn)btn.style.display='flex';
            console.log('[nicoPhone] '+t+'ms 浮动按钮已显示');
        }
    },t);
});


// ========== 剧情联动：支持多种消息类型，区分用户/角色 ==========
var storyObserver2=null;
var processedStoryNodes2=new WeakSet();
var ncObserverReady=false;
function startStoryListener(){
    if(storyObserver2){storyObserver2.disconnect();storyObserver2=null;}
    ncObserverReady=false;
    setTimeout(function(){ncObserverReady=true;console.log('[Nicole] 剧情监听器就绪');},3000);
    try{
        storyObserver2=new MutationObserver(function(mutations){
            if(!ncObserverReady) return;
            for(var mi=0;mi<mutations.length;mi++){
                var added=mutations[mi].addedNodes;
                for(var ai=0;ai<added.length;ai++){
                    var node=added[ai];
                    if(node.nodeType!==1) continue;
                    if(node.closest&&node.closest('#'+PANEL_ID)) continue;
                    scanNodeForPhoneMsg2(node);
                    if(node.querySelectorAll){
                        var children=node.querySelectorAll('div,p,span,li');
                        for(var ci=0;ci<children.length;ci++){
                            if(children[ci].closest&&children[ci].closest('#'+PANEL_ID)) continue;
                            scanNodeForPhoneMsg2(children[ci]);
                        }
                    }
                }
            }
        });
        storyObserver2.observe(document.body,{childList:true,subtree:true});
        console.log('[Nicole] 剧情监听器已启动（3秒冷却中）');
    }catch(e){console.log('[Nicole] 剧情监听器失败:',e);}
}
// 获取所有需要匹配的角色名（备注名+原始角色卡名）
function getCharNames(){
    var names=[];
    if(finalLName&&finalLName!=='角色'&&finalLName!=='Unknown'&&finalLName!=='我')names.push(finalLName);
    if(currentCharName&&currentCharName!=='角色'&&currentCharName!=='Unknown'&&currentCharName!=='我'&&names.indexOf(currentCharName)===-1)names.push(currentCharName);
    return names;
}
function ncGuessIsUser(node){
    if(!node) return false;
    var el=node;
    for(var i=0;i<12&&el;i++){
        if(el.classList&&el.className){
            var cls=(' '+el.className+' ').toLowerCase();
            if(/\b(you|user_mes|user-message|my-message|me-msg|right-msg|msg-right|user_msg|usermsg|message-right|right-message|user|my-msg|me_message)\b/.test(cls)) return true;
            if(/\b(char|bot|ai-msg|assistant|left-msg|msg-left|char_mes|char-msg|bot-msg|ai_msg|message-left|left-message|bot_message|char_message)\b/.test(cls)) return false;
        }
        el=el.parentElement;
    }
    try{
        if(node.getBoundingClientRect){
            var r=node.getBoundingClientRect();
            var chatArea=document.querySelector('#chat,[class*="chat-container"],[id*="chat"]');
            if(chatArea){var cr=chatArea.getBoundingClientRect();if(r.left>cr.left+cr.width*0.4) return true;}
        }
    }catch(e){}
    return false;
}
function scanNodeForPhoneMsg2(node){
    if(!node||node.nodeType!==1) return;
    if(processedStoryNodes2.has(node)) return;
    var txt=node.textContent||node.innerText||'';
    if(!txt||txt.length<3) return;
    var hasMarker=/\[(微信|语音|红包|图片|转账|手机|电话|朋友圈|拍一拍|系统|拉黑|加好友|收款|退回|正在输入|角色|我|角色语音|角色红包|角色图片|角色转账|角色表情|我语音|我红包|我图片|我转账|我表情|我朋友圈|我拍一拍|我拉黑|我取消拉黑|我加好友|我电话|我通话|我视频|角色通话|角色视频|通话|视频)[：:]|\[(我拉黑|我取消拉黑)\]|!\[[^\]]*\]\(/.test(txt)||/<msg>/.test(txt)||/\[[^\[\]:]+(语音|表情|图片|红包|转账|通话|视频|电话|朋友圈|拍一拍)[：:]/.test(txt)||(finalLName&&finalLName!=='角色'&&finalLName!=='Unknown'&&new RegExp('\\['+finalLName.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+'(朋友圈|拍一拍|拉黑|取消拉黑|加好友|语音|表情|图片|红包|转账|通话|视频|电话)?[：:]?').test(txt));
    // 通用格式检测：[任意名字通话/视频/电话:内容]，不依赖角色名获取
    if(!hasMarker){if(/\[[^\[\]:]+(通话|视频|电话)[：:]/.test(txt))hasMarker=true;}
    if(!hasMarker) return;
    processedStoryNodes2.add(node);
    var isUser=ncGuessIsUser(node);
    // 我专用格式（优先匹配，强制右侧）
    var fm;
    if((fm=txt.match(/\[我语音[：:]([^\]]*?)\]/))&&fm[1].trim()){renderPhoneMessage(fm[1].trim(),'voice',true);}
    if((fm=txt.match(/\[我通话[：:]([^\]]*?)\]/))&&fm[1].trim()){try{if(window.NcAPI&&!document.querySelector('.Nicole-jcall.show'))window.NcAPI.openCallUI('voice','in');if(window.NcAddCallBubble)window.NcAddCallBubble('right',fm[1].trim(),false,'voice');}catch(e){}}
    if((fm=txt.match(/\[我视频[：:]([^\]]*?)\]/))&&fm[1].trim()){try{if(window.NcAPI&&!document.querySelector('.Nicole-jcall.show'))window.NcAPI.openCallUI('video','in');if(window.NcAddCallBubble)window.NcAddCallBubble('right',fm[1].trim(),false,'video');}catch(e){}}
    if((fm=txt.match(/\[我红包[：:]([^\]]*?)\]/))&&fm[1].trim()){renderPhoneMessage(fm[1].trim(),'redpacket',true);}
    if((fm=txt.match(/\[我图片[：:]([^\]]*?)\]/))&&fm[1].trim()){renderPhoneMessage(fm[1].trim(),'image',true);}
    if((fm=txt.match(/\[我转账[：:]([^\]]*?)\]/))&&fm[1].trim()){renderPhoneMessage(fm[1].trim(),'transfer',true);}
    if((fm=txt.match(/\[我收款[：:]([^\]]*?)\]/))&&fm[1].trim()){renderSysMsg('你已收款 ¥'+fm[1].trim());}
    if((fm=txt.match(/\[我退回[：:]([^\]]*?)\]/))&&fm[1].trim()){renderSysMsg('你已退回转账 ¥'+fm[1].trim());}
    if((fm=txt.match(/\[我文字图[：:]([\s\S]*?)\]/))&&fm[1].trim()){renderPhoneMessage(fm[1].trim(),'txtimg',true);}
    if((fm=txt.match(/\[我文图[：:]([\s\S]*?)\]/))&&fm[1].trim()){renderPhoneMessage(fm[1].trim(),'txtimg',true);}
    if((fm=txt.match(/\[我定位[：:]([^\]]*?)\]/))&&fm[1].trim()){renderPhoneMessage(fm[1].trim(),'location',true);}
    var meEmoRe=/\[我表情[：:](!\[[^\]]*\]\([^)]*\)|[^\]]*)\]/;if((fm=txt.match(meEmoRe))&&fm[1].trim()){renderPhoneMessage(fm[1].trim(),'image',true);}
    if((fm=txt.match(/\[我[：:]([\s\S]*?)\]/))&&fm[1].trim()){renderPhoneMessage(fm[1].trim(),'text',true);}
    // 动态角色名格式：[角色名:内容] - 遍历所有别名（备注名+原始角色卡名）
    var charNames=getCharNames();
    for(var cni=0;cni<charNames.length;cni++){
        try{
            var cnEsc=charNames[cni].replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
            var dmRe=new RegExp('\\['+cnEsc+'[：:]([\\s\\S]*?)\\]','g');
            var dm;while((dm=dmRe.exec(txt))!==null){if(dm[1].trim())renderPhoneMessage(dm[1].trim(),'text',false);}
            var dm2Re=new RegExp('\\['+cnEsc+'语音[：:]([^\\]]*?)\\]','g');
            while((dm=dm2Re.exec(txt))!==null){if(dm[1].trim())renderPhoneMessage(dm[1].trim(),'voice',false);}
            // 角色发起通话：[角色名电话:语音/视频]
            var dmPhoneRe=new RegExp('\\['+cnEsc+'电话[：:](语音|视频)\\]','g');
            while((dm=dmPhoneRe.exec(txt))!==null){try{if(typeof openCallUI==='function')openCallUI(dm[1],'in');if(typeof playRing==='function')playRing();}catch(e){}}
            // 角色通话中消息：[角色名电话:内容]（内容不是语音/视频时，显示在通话界面）
            var dmPhoneMsgRe=new RegExp('\\['+cnEsc+'电话[：:](?!语音|视频)([^\\]]+)\\]','g');
            while((dm=dmPhoneMsgRe.exec(txt))!==null){if(dm[1].trim()){try{if(window.NcAPI&&!document.querySelector('.Nicole-jcall.show'))window.NcAPI.openCallUI('voice','in');if(window.NcAddCallBubble)window.NcAddCallBubble('left',dm[1].trim(),false,'voice');}catch(e){}}}
            var dmCallRe=new RegExp('\\['+cnEsc+'通话[：:]([^\\]]*?)\\]','g');
            while((dm=dmCallRe.exec(txt))!==null){if(dm[1].trim()){try{if(window.NcAPI&&!document.querySelector('.Nicole-jcall.show'))window.NcAPI.openCallUI('voice','in');if(window.NcAddCallBubble)window.NcAddCallBubble('left',dm[1].trim(),false,'voice');}catch(e){}}}
            var dmVidRe=new RegExp('\\['+cnEsc+'视频[：:]([^\\]]*?)\\]','g');
            while((dm=dmVidRe.exec(txt))!==null){if(dm[1].trim()){try{if(window.NcAPI&&!document.querySelector('.Nicole-jcall.show'))window.NcAPI.openCallUI('video','in');if(window.NcAddCallBubble)window.NcAddCallBubble('left',dm[1].trim(),false,'video');}catch(e){}}}
            var dm3Re=new RegExp('\\['+cnEsc+'红包[：:]([^\\]]*?)\\]','g');
            while((dm=dm3Re.exec(txt))!==null){if(dm[1].trim())renderPhoneMessage(dm[1].trim(),'redpacket',false);}
            var dm4Re=new RegExp('\\['+cnEsc+'图片[：:]([^\\]]*?)\\]','g');
            while((dm=dm4Re.exec(txt))!==null){if(dm[1].trim())renderPhoneMessage(dm[1].trim(),'image',false);}
            var dm5Re=new RegExp('\\['+cnEsc+'转账[：:]([^\\]]*?)\\]','g');
            while((dm=dm5Re.exec(txt))!==null){if(dm[1].trim())renderPhoneMessage(dm[1].trim(),'transfer',false);}
            var dm5bRe=new RegExp('\\['+cnEsc+'收款[：:]([^\\]]*?)\\]','g');
            while((dm=dm5bRe.exec(txt))!==null){if(dm[1].trim())renderSysMsg(cnName+' 已收款 ¥'+dm[1].trim());}
            var dm5cRe=new RegExp('\\['+cnEsc+'退回[：:]([^\\]]*?)\\]','g');
            while((dm=dm5cRe.exec(txt))!==null){if(dm[1].trim())renderSysMsg(cnName+' 已退回转账 ¥'+dm[1].trim());}
            var dm7Re=new RegExp('\\['+cnEsc+'文字图[：:]([\\s\\S]*?)\\]','g');
            while((dm=dm7Re.exec(txt))!==null){if(dm[1].trim())renderPhoneMessage(dm[1].trim(),'txtimg',false);}
            var dm8Re=new RegExp('\\['+cnEsc+'文图[：:]([\\s\\S]*?)\\]','g');
            while((dm=dm8Re.exec(txt))!==null){if(dm[1].trim())renderPhoneMessage(dm[1].trim(),'txtimg',false);}
            var dm9Re=new RegExp('\\['+cnEsc+'定位[：:]([^\\]]*?)\\]','g');
            while((dm=dm9Re.exec(txt))!==null){if(dm[1].trim())renderPhoneMessage(dm[1].trim(),'location',false);}
            // 表情包
            var dm6Re=new RegExp('\\['+cnEsc+'表情[：:]([^\\]]*)\\]','g');
            while((dm=dm6Re.exec(txt))!==null){if(dm[1].trim())renderPhoneMessage(dm[1].trim(),'image',false);}
        }catch(e){}
    }
    // 角色专用格式（强制左侧）
    if((fm=txt.match(/\[角色语音[：:]([^\]]*?)\]/))&&fm[1].trim()){renderPhoneMessage(fm[1].trim(),'voice',false);}
    if((fm=txt.match(/\[角色电话[：:](语音|视频)\]/))&&fm[1]){try{if(typeof openCallUI==='function')openCallUI(fm[1],'in');if(typeof playRing==='function')playRing();}catch(e){}}
    if((fm=txt.match(/\[角色通话[：:]([^\]]*?)\]/))&&fm[1].trim()){try{if(window.NcAddCallBubble)window.NcAddCallBubble('left',fm[1].trim(),false,'voice');}catch(e){}}
    if((fm=txt.match(/\[角色视频[：:]([^\]]*?)\]/))&&fm[1].trim()){try{if(window.NcAddCallBubble)window.NcAddCallBubble('left',fm[1].trim(),false,'voice');}catch(e){}}
    if((fm=txt.match(/\[角色红包[：:]([^\]]*?)\]/))&&fm[1].trim()){renderPhoneMessage(fm[1].trim(),'redpacket',false);}
    if((fm=txt.match(/\[角色图片[：:]([^\]]*?)\]/))&&fm[1].trim()){renderPhoneMessage(fm[1].trim(),'image',false);}
    if((fm=txt.match(/\[角色转账[：:]([^\]]*?)\]/))&&fm[1].trim()){renderPhoneMessage(fm[1].trim(),'transfer',false);}
    if((fm=txt.match(/\[角色收款[：:]([^\]]*?)\]/))&&fm[1].trim()){renderSysMsg((finalLName||'对方')+' 已收款 ¥'+fm[1].trim());}
    if((fm=txt.match(/\[角色退回[：:]([^\]]*?)\]/))&&fm[1].trim()){renderSysMsg((finalLName||'对方')+' 已退回转账 ¥'+fm[1].trim());}
    if((fm=txt.match(/\[角色文字图[：:]([\s\S]*?)\]/))&&fm[1].trim()){renderPhoneMessage(fm[1].trim(),'txtimg',false);}
    if((fm=txt.match(/\[角色文图[：:]([\s\S]*?)\]/))&&fm[1].trim()){renderPhoneMessage(fm[1].trim(),'txtimg',false);}
    if((fm=txt.match(/\[角色定位[：:]([^\]]*?)\]/))&&fm[1].trim()){renderPhoneMessage(fm[1].trim(),'location',false);}
    if((fm=txt.match(/\[角色表情[：:]([^\]]*?)\]/))&&fm[1].trim()){renderPhoneMessage(fm[1].trim(),'image',false);}
    if(finalLName&&finalLName!=='角色'&&finalLName!=='Unknown'){try{var cnEmo=finalLName.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');var emRe=new RegExp('\\['+cnEmo+'表情[：:](!\\[[^\\]]*\\]\\([^)]*\\)|[^\\]]*)\\]');var em=txt.match(emRe);if(em&&em[1].trim()){renderPhoneMessage(em[1].trim(),'image',false);}}catch(e){}}
    if((fm=txt.match(/\[角色[：:]([\s\S]*?)\]/))&&fm[1].trim()){renderPhoneMessage(fm[1].trim(),'text',false);}

    // 功能触发 - 通话
    // 用户呼出：[我电话:语音] / [我电话:视频]
    if(/\[我电话[：:](语音|视频)/.test(txt)&&window.NcAPI){var cm2=txt.match(/\[我电话[：:](语音|视频)/);window.NcAPI.openCallUI(cm2[1]==='视频'?'video':'voice','out');}
    // 用户通话中消息：[我电话:内容]（内容不是语音/视频时，显示在通话界面）
    var mePhoneMsg=txt.match(/\[我电话[：:](?!语音|视频)([^\]]+)\]/);
    if(mePhoneMsg&&mePhoneMsg[1].trim()){try{if(window.NcAPI&&!document.querySelector('.Nicole-jcall.show'))window.NcAPI.openCallUI('voice','in');if(window.NcAddCallBubble)window.NcAddCallBubble('right',mePhoneMsg[1].trim(),false,'voice');}catch(e){}}
    // 角色来电：[角色名电话:语音] / [角色名电话:视频]（遍历别名）
    var _callNames=getCharNames();
    for(var _cni=0;_cni<_callNames.length;_cni++){
        try{
            var _cne=_callNames[_cni].replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
            var _cm=txt.match(new RegExp('\\['+_cne+'电话[：:](语音|视频)'));
            if(_cm&&window.NcAPI){window.NcAPI.openCallUI(_cm[1]==='视频'?'video':'voice','in');break;}
        }catch(e){}
    }
    // 兼容旧格式：[电话:语音] / [电话:视频]（默认角色来电）
    if(/\[电话[：:](语音|视频)/.test(txt)&&window.NcAPI){var cm=txt.match(/\[电话[：:](语音|视频)/);window.NcAPI.openCallUI(cm[1]==='视频'?'video':'voice','in');}
    // ===== 通用通话匹配（不依赖角色名获取）=====
    // 通用角色来电：[任意名字电话:语音/视频]，名字不是"我"就当角色来电
    try{
        var _genPhoneRe=/\[([^\[\]:]+)电话[：:](语音|视频)\]/g;
        var _gpm;
        while((_gpm=_genPhoneRe.exec(txt))!==null){
            var _gpn=_gpm[1].trim();
            if(_gpn&&_gpn!=='我'&&_gpn!=='角色'&&window.NcAPI){
                window.NcAPI.openCallUI(_gpm[2]==='视频'?'video':'voice','in');
                break;
            }
        }
    }catch(e){}
    // 通用通话中消息：[任意名字通话:内容]
    try{
        var _genCallRe=/\[([^\[\]:]+)通话[：:]([^\]]*?)\]/g;
        var _gcm;
        while((_gcm=_genCallRe.exec(txt))!==null){
            var _gcn=_gcm[1].trim();
            var _gcc=_gcm[2].trim();
            if(_gcc){
                var _isMe=(_gcn==='我');
                try{if(window.NcAPI&&!document.querySelector('.Nicole-jcall.show'))window.NcAPI.openCallUI('voice','in');if(window.NcAddCallBubble)window.NcAddCallBubble(_isMe?'right':'left',_gcc,false,'voice');}catch(e){}
            }
        }
    }catch(e){}
    // 通用视频通话中消息：[任意名字视频:内容]
    try{
        var _genVidRe=/\[([^\[\]:]+)视频[：:]([^\]]*?)\]/g;
        var _gvm;
        while((_gvm=_genVidRe.exec(txt))!==null){
            var _gvn=_gvm[1].trim();
            var _gvc=_gvm[2].trim();
            if(_gvc){
                var _isMe2=(_gvn==='我');
                try{if(window.NcAPI&&!document.querySelector('.Nicole-jcall.show'))window.NcAPI.openCallUI('video','in');if(window.NcAddCallBubble)window.NcAddCallBubble(_isMe2?'right':'left',_gvc,false,'video');}catch(e){}
            }
        }
    }catch(e){}
    if(/\[朋友圈[：:]/.test(txt)&&window.NcAPI){var pm=txt.match(/\[朋友圈[：:]([^\]|]+)(?:\|([^\]]+))?/);if(pm)window.NcAPI.addPyq(pm[1]||'',pm[2]||'');}
    // 区分角色/用户的朋友圈
    if(finalLName&&finalLName!=='角色'&&finalLName!=='Unknown'){
        try{
            var cnE=finalLName.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
            var cPyq=txt.match(new RegExp('\\['+cnE+'朋友圈[：:]([^\\]|]+)(?:\\|([^\\]]+))?'));
            if(cPyq&&window.NcAPI){window.NcAPI.addPyq(cPyq[1]||'',cPyq[2]||'');renderSysMsg(finalLName+' 发了一条朋友圈');}
            var uPyq=txt.match(/\[我朋友圈[：:]([^\]|]+)(?:\|([^\]]+))?/);
            if(uPyq&&window.NcAPI){window.NcAPI.addPyq(uPyq[1]||'',uPyq[2]||'');renderSysMsg(finalRName+' 发了一条朋友圈');}
        }catch(e){}
    }
    // 区分角色/用户的拍一拍
    if(finalLName&&finalLName!=='角色'&&finalLName!=='Unknown'){
        try{
            var cnE2=finalLName.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
            var cPoke=txt.match(new RegExp('\\['+cnE2+'拍一拍[：:]([^\\]]+)'));
            if(cPoke){renderSysMsg(finalLName+' 拍了拍 '+finalRName+' '+cPoke[1]);}
            var uPoke=txt.match(/\[我拍一拍[：:]([^\]]+)/);
            if(uPoke){renderSysMsg(finalRName+' 拍了拍 '+finalLName+' '+uPoke[1]);}
        }catch(e){}
    }
    // 区分角色/用户的拉黑
    if(finalLName&&finalLName!=='角色'&&finalLName!=='Unknown'){
        try{
            var cnE3=finalLName.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
            if(new RegExp('\\['+cnE3+'拉黑\]').test(txt)){isBlkLeft=true;renderSysMsg(finalLName+' 将 '+finalRName+' 拉入黑名单');}
            if(new RegExp('\\['+cnE3+'取消拉黑\]').test(txt)){isBlkLeft=false;renderSysMsg(finalLName+' 将 '+finalRName+' 移出黑名单');}
            if(/\[我拉黑\]/.test(txt)){isBlkRight=true;renderSysMsg(finalRName+' 将 '+finalLName+' 拉入黑名单');}
            if(/\[我取消拉黑\]/.test(txt)){isBlkRight=false;renderSysMsg(finalRName+' 将 '+finalLName+' 移出黑名单');}
        }catch(e){}
    }
    // 区分角色/用户的加好友
    if(finalLName&&finalLName!=='角色'&&finalLName!=='Unknown'){
        try{
            var cnE4=finalLName.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
            var cAdd=txt.match(new RegExp('\\['+cnE4+'加好友[：:]([^\\]]+)'));
            if(cAdd){renderSysMsg(finalLName+' 发送了好友请求：'+cAdd[1]);}
            var uAdd=txt.match(/\[我加好友[：:]([^\]]+)/);
            if(uAdd){renderSysMsg(finalRName+' 发送了好友请求：'+uAdd[1]);Q('.Nicole-jaddfriendmodal').classList.add('show');}
        }catch(e){}
    }
    // 通用格式
    var patterns=[
        {re:/\[微信语音[：:]([^\]]*?)\]/g,type:'voice'},
        {re:/\[语音[：:]([^\]]*?)\]/g,type:'voice'},
        {re:/\[微信红包[：:]([^\]]*?)\]/g,type:'redpacket'},
        {re:/\[红包[：:]([^\]]*?)\]/g,type:'redpacket'},
        {re:/\[微信图片[：:]([^\]]*?)\]/g,type:'image'},
        {re:/\[图片[：:]([^\]]*?)\]/g,type:'image'},
        {re:/\[微信转账[：:]([^\]]*?)\]/g,type:'transfer'},
        {re:/\[转账[：:]([^\]]*?)\]/g,type:'transfer'},
        {re:/\[微信文字[：:]([\s\S]*?)\]/g,type:'text'},
        {re:/\[微信消息[：:]([\s\S]*?)\]/g,type:'text'},
        {re:/\[微信[：:]([\s\S]*?)\]/g,type:'text'},
        {re:/\[手机消息[：:]([\s\S]*?)\]/g,type:'text'},
        {re:/\[手机[：:]([\s\S]*?)\]/g,type:'text'}
    ];
    for(var pi=0;pi<patterns.length;pi++){
        var match;
        while((match=patterns[pi].re.exec(txt))!==null){
            var mc=match[1].trim();
            if(mc){renderPhoneMessage(mc,patterns[pi].type,isUser);}
        }
    }
    // 正文气泡渲染
    ncRenderInlineBubbles(node);
}
// 聊天列表渲染
function renderChatListScreen(){
    try{
        var panel=document.getElementById(PANEL_ID);
        if(!panel) return;
        var body=panel.querySelector('.Nicole-jchatlist-body');
        if(!body) return;
        var list=JSON.parse(localStorage.getItem('Nc-chat-list')||'[]');
        var html='';
        list.forEach(function(name){
            var key='Nc-chat-'+name;
            var saved=localStorage.getItem(key)||'';
            var lastMsg='暂无消息';
            try{var tmp=document.createElement('div');tmp.innerHTML=saved;var msgs=tmp.querySelectorAll('.Nicole-bub');if(msgs.length>0)lastMsg=msgs[msgs.length-1].textContent.substring(0,25);}catch(e){}
            var av=localStorage.getItem('Nc-av-'+name)||'';
            var avStyle=av?'style="background-image:url('+av.replace(/'/g,'%27')+')"':'';
            html+='<div class="Nicole-chatlist-item" data-name="'+name+'"><div class="Nicole-chatlist-inner"><div class="Nicole-chatlist-av"'+avStyle+'>'+(av?'':name.charAt(0))+'</div><div class="Nicole-chatlist-info"><div class="Nicole-chatlist-name">'+name+'</div><div class="Nicole-chatlist-msg">'+lastMsg+'</div></div></div><div class="Nicole-chatlist-del" data-name="'+name+'"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg><span>删除</span></div></div>';
        });
        if(!html) html='<div class="Nicole-chatlist-add" style="text-align:center;color:#999;padding:40px 0;font-size:13px;">点击右上角 + 添加聊天人物</div>';
        body.innerHTML=html;
        var homeEl=panel.querySelector('.Nicole-jhome');
        var chatlistEl=panel.querySelector('.Nicole-jchatlist-screen');
        body.querySelectorAll('.Nicole-chatlist-item').forEach(function(item){
            var inner=item.querySelector('.Nicole-chatlist-inner');
            var delBtn=item.querySelector('.Nicole-chatlist-del');
            if(!inner||!delBtn)return;
            var startX=0,startY=0,curX=0,isDragging=false,isOpen=false;
            var delWidth=70;
            // 触摸左滑
            inner.addEventListener('touchstart',function(e){
                startX=e.touches[0].clientX;startY=e.touches[0].clientY;curX=isOpen?-delWidth:0;isDragging=true;
                inner.style.transition='none';
            },{passive:true});
            inner.addEventListener('touchmove',function(e){
                if(!isDragging)return;
                var dx=e.touches[0].clientX-startX;
                var dy=e.touches[0].clientY-startY;
                if(Math.abs(dy)>Math.abs(dx))return;
                var nx=curX+dx;
                if(nx>0)nx=0;
                if(nx<-delWidth-20)nx=-delWidth-20;
                inner.style.transform='translateX('+nx+'px)';
                delBtn.style.opacity=Math.min(1,Math.abs(nx)/delWidth);
            },{passive:true});
            inner.addEventListener('touchend',function(e){
                if(!isDragging)return;
                isDragging=false;
                inner.style.transition='transform .3s cubic-bezier(.2,.8,.2,1)';
                var dx=e.changedTouches[0].clientX-startX;
                if(curX+dx<-delWidth/2){
                    inner.style.transform='translateX(-'+delWidth+'px)';isOpen=true;
                }else{
                    inner.style.transform='translateX(0)';isOpen=false;
                }
            });
            // 鼠标左滑（电脑端）
            var mouseDown=false;
            inner.addEventListener('mousedown',function(e){
                if(e.button!==0)return;
                startX=e.clientX;startY=e.clientY;curX=isOpen?-delWidth:0;isDragging=true;mouseDown=true;
                inner.style.transition='none';
                e.preventDefault();
            });
            document.addEventListener('mousemove',function(e){
                if(!isDragging||!mouseDown)return;
                var dx=e.clientX-startX;
                var dy=e.clientY-startY;
                if(Math.abs(dy)>Math.abs(dx)&&Math.abs(dx)<5)return;
                var nx=curX+dx;
                if(nx>0)nx=0;
                if(nx<-delWidth-20)nx=-delWidth-20;
                inner.style.transform='translateX('+nx+'px)';
                delBtn.style.opacity=Math.min(1,Math.abs(nx)/delWidth);
            });
            document.addEventListener('mouseup',function(e){
                if(!isDragging||!mouseDown)return;
                isDragging=false;mouseDown=false;
                inner.style.transition='transform .3s cubic-bezier(.2,.8,.2,1)';
                var dx=e.clientX-startX;
                if(curX+dx<-delWidth/2){
                    inner.style.transform='translateX(-'+delWidth+'px)';isOpen=true;
                }else{
                    inner.style.transform='translateX(0)';isOpen=false;
                }
            });
            // 删除按钮点击
            delBtn.addEventListener('click',function(e){
                e.stopPropagation();
                var name=this.getAttribute('data-name');
                if(name&&confirm('删除与「'+name+'」的聊天记录？')){
                    var list=JSON.parse(localStorage.getItem('Nc-chat-list')||'[]');
                    list=list.filter(function(n){return n!==name;});
                    localStorage.setItem('Nc-chat-list',JSON.stringify(list));
                    localStorage.removeItem('Nc-chat-'+name);
                    if(finalLName===name){finalLName='';currentCharName='';}
                    renderChatListScreen();
                }
            });
            item.addEventListener('click',function(e){
                if(isOpen){
                    inner.style.transform='translateX(0)';isOpen=false;
                    e.stopPropagation();
                    return;
                }
                var name=this.getAttribute('data-name');
                if(name){
                    if(finalLName) saveChatForChar(finalLName);
                    finalLName=name;currentCharName=name;ncManualChar=true;
                    loadChatForChar(name);
                    panel.querySelectorAll('.Nicole-bind-lnm').forEach(function(el){el.textContent=name;});
                    if(chatlistEl)chatlistEl.classList.remove('show');
                    if(homeEl)homeEl.classList.remove('active');
                }
            });
        });
    }catch(e){console.log('[Nicole] renderChatListScreen error:',e);}
}
// ===== 聊天内容删除（电脑端悬停显示删除按钮，手机端长按）=====


function saveChatForChar(charName){
    try{if(!charName)return;var panel=document.getElementById(PANEL_ID);if(!panel)return;var chatBox=panel.querySelector('.Nicole-jchat');if(!chatBox)return;localStorage.setItem('Nc-chat-'+charName,chatBox.innerHTML);var list=JSON.parse(localStorage.getItem('Nc-chat-list')||'[]');if(list.indexOf(charName)===-1){list.unshift(charName);localStorage.setItem('Nc-chat-list',JSON.stringify(list));}}catch(e){}
}
function loadChatForChar(charName){
    try{if(!charName)return false;var panel=document.getElementById(PANEL_ID);if(!panel)return false;var chatBox=panel.querySelector('.Nicole-jchat');if(!chatBox)return false;var saved=localStorage.getItem('Nc-chat-'+charName);if(saved&&saved.length>10){chatBox.innerHTML=saved;chatBox.scrollTop=chatBox.scrollHeight;return true;}chatBox.innerHTML='';return false;}catch(e){return false;}
}
function renderPhoneMessage(text,type,isUser){
    try{
        var panel=document.getElementById(PANEL_ID);
        if(!panel) return;
        var chatBox=panel.querySelector('.Nicole-jchat');
        if(!chatBox) return;
        var dir=isUser?'right':'left';
        var avClass=isUser?'Nicole-bind-rav user-avatar':'Nicole-bind-lav char-avatar';
        var avUrl=isUser?safeRAv:safeLAv;
        var avStyle=avUrl?' style="background-image:url(\''+avUrl+'\')"':'';
        var now=new Date();
        var time=String(now.getHours()).padStart(2,'0')+':'+String(now.getMinutes()).padStart(2,'0');
        var body='';
        if(type==='voice'){
            // 格式：时长"|内容 或 时长"
            var parts=text.split('|');
            var dur=parts[0].trim()||(Math.max(1,Math.round(text.length/4))+'"');
            var vtxt=parts[1]?parts[1].trim():'';
            body='<div class="Nicole-au" data-txt="'+vtxt.replace(/"/g,'&quot;')+'"><div class="Nicole-au-main"><div class="Nicole-au-play"></div><div class="Nicole-au-bars"><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div><div class="Nicole-au-dur">'+dur+'</div></div><div class="Nicole-au-wrap"><div class="Nicole-au-txt">'+vtxt+'</div></div></div>';
        }else if(type==='redpacket'){
            // 格式：金额|备注
            var rp=text.split('|');
            var amt=rp[0].trim()||'0.00';
            var note=rp[1]?rp[1].trim():'恭喜发财';
            body='<div class="Nicole-link-card Nicole-gift-card"><div class="Nicole-link-ic" style="background:linear-gradient(135deg,#ff6b6b,#ee5a5a);border-radius:10px;"><svg viewBox="0 0 24 24" fill="#fff" stroke="#fff" stroke-width="1.5"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M12 4v16M3 12h18"/></svg></div><div class="Nicole-tf-info"><div class="Nicole-tf-t">微信红包</div><div class="Nicole-tf-a" style="color:var(--sys-txt);">¥'+amt+' - '+note+'</div></div></div>';
        }else if(type==='image'){
            // 支持：纯URL、说明|URL、完整<img>标签
            var imgUrl=text, imgAlt='';
            // 如果是完整的img标签，直接提取src
            var imgTagMatch=text.match(/<img[^>]+src=["']([^"']+)["'][^>]*>/i);
            if(imgTagMatch){
                imgUrl=imgTagMatch[1];
                var altMatch=text.match(/alt=["']([^"']*)["']/i);
                if(altMatch) imgAlt=altMatch[1];
            }else{
                // 去掉首尾多余的[]
                var cleanText=text.replace(/^\[+/,'').replace(/\]+$/,'').trim();
                var mdMatch=cleanText.match(/!\[([^\]]*)\]\(([^)]+)\)/);
                if(mdMatch){imgAlt=mdMatch[1];imgUrl=mdMatch[2];}
                else if(cleanText.indexOf('|')>-1){var pp=cleanText.split('|');imgAlt=pp[0].trim();imgUrl=pp.slice(1).join('|').trim();}
                else{imgUrl=cleanText;}
            }
            body='<img src="'+imgUrl+'" class="Nicole-img" alt="'+imgAlt.replace(/"/g,'&quot;')+'" style="max-width:160px;border-radius:10px;display:block;">';
        }else if(type==='transfer'){
            // 格式：金额|说明
            var tf=text.split('|');
            var tamt=tf[0].trim()||'0.00';
            var ttitle=tf[1]?tf[1].trim():'转账';
            body='<div class="Nicole-tf Nicole-j-pure-tf" data-amt="'+tamt+'"><div class="Nicole-tf-ic">¥</div><div class="Nicole-tf-info"><div class="Nicole-tf-t">'+ttitle+'</div><div class="Nicole-tf-a">¥ '+tamt+'</div><div class="Nicole-tf-f">微信转账</div></div></div>';
        }else if(type==='txtimg'){
            // 文字图：格式 内容
            body='<div class="Nicole-txt-img">'+text.replace(/</g,'&lt;').replace(/>/g,'&gt;')+'</div>';
        }else if(type==='location'){
            // 定位：格式 名称|距离
            var locParts=text.split('|');
            var locName=locParts[0].trim()||'我的位置';
            var locDist=locParts[1]?locParts[1].trim():'未知距离';
            body='<div class="Nicole-tf Nicole-loc-card"><div class="Nicole-link-ic" style="border-radius:50%;"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg></div><div class="Nicole-tf-info"><div class="Nicole-tf-t">'+locName+'</div><div class="Nicole-tf-a" style="color:var(--sys-txt);">'+(locDist.indexOf('距离')>=0?locDist:'距离 '+locDist)+'</div></div></div>';
        }else{
            body='<div class="Nicole-bub">'+text.replace(/</g,'&lt;').replace(/>/g,'&gt;')+'</div>';
        }
        var row=document.createElement('div');
        var isBlocked=(isUser&&window.NcIsBlkLeft&&window.NcIsBlkLeft())||(!isUser&&window.NcIsBlkRight&&window.NcIsBlkRight());
        row.className='Nicole-row '+dir+(isBlocked?' has-err':'');
        row.style.opacity='0';
        row.style.animation='Nicole-pop .4s forwards cubic-bezier(.2,.8,.2,1)';
        row.innerHTML='<div class="Nicole-'+(isUser?'rav':'lav')+' '+avClass+'"'+avStyle+'></div><div class="Nicole-ct">'+body+'<div class="Nicole-meta">'+time+(isUser?' <span class="Nicole-tick">✓✓</span>':'')+'</div></div>'+(isBlocked?'<div class="Nicole-err-icon" title="消息被拒收">!</div>':'');
        chatBox.appendChild(row);
        chatBox.scrollTop=chatBox.scrollHeight;
        // 未读提示
        if(!isUser){
            var floatEl=document.getElementById(FLOAT_ID);
            if(floatEl){
                var btn=floatEl.querySelector('#'+TOGGLE_ID);
                if(btn){btn.style.boxShadow='0 0 0 3px rgba(255,59,48,.6),0 4px 16px rgba(0,0,0,.15)';setTimeout(function(){btn.style.boxShadow='';},2500);}
            }
        }
    }catch(e){console.log('[Nicole] renderPhoneMessage error:',e);}
}


// ===== 正文内嵌气泡渲染 =====
function ncInlineBubbleHTML(type,content,isUser){
    var dir=isUser?'nc-right':'nc-left';
    // 正文头像：黑白灰首字母样式，不自动获取（避免获取失败显示蓝色默认）
    var av='';
    // 名字：用户固定"我"，角色用全局变量+页面兜底
    var name='';
    if(isUser){name='我';}
    else{
        name=finalLName||'';
        if(!name||name==='Unknown'||name==='角色'){
            try{
                var sels=['.char-name','#ch_name','.character-name','#character_name','[class*="char-name"]','[class*="charName"]','.chat-header-name','.character_card_name'];
                for(var ni=0;ni<sels.length;ni++){var nel=document.querySelector(sels[ni]);if(nel&&nel.textContent&&nel.textContent.trim()&&nel.textContent.trim().length<30&&nel.textContent.trim()!=='SillyTavern'&&nel.textContent.trim()!=='Mufy'){name=nel.textContent.trim();break;}}
            }catch(e){}
        }
        if(!name) name='角色';
    }
    // 气泡颜色同步手机设置（优先localStorage，和手机一致）
    var bubColor=isUser?'#95ec69':'#ffffff';
    try{
        var lsBub=isUser?localStorage.getItem('Nc-bub'):localStorage.getItem('Nc-bubl');
        if(lsBub&&lsBub.trim()) bubColor=lsBub.trim();
    }catch(e){}
    try{
        var phonePanel=document.getElementById(PANEL_ID);
        if(phonePanel){
            var stageEl=phonePanel.querySelector('.Nicole-stage')||phonePanel;
            var cs=window.getComputedStyle(stageEl);
            var cssColor=isUser?cs.getPropertyValue('--bub-r'):cs.getPropertyValue('--bub-l');
            if(cssColor&&cssColor.trim()&&cssColor.trim()!=='none') bubColor=cssColor.trim();
        }
    }catch(e){}
    var avHtml='';
    var avChar=name?name.charAt(0).toUpperCase():'?';
    var avClass=isUser?'nc-inline-av nc-av-user':'nc-inline-av nc-av-char';
    avHtml='<div class="nc-inline-av-wrap"><div class="'+avClass+'">'+avChar+'</div></div>';
    var bub='';
    if(type==='call-voice'||type==='call-video'){
        var callIcon=type==='call-video'?'📹':'📞';
        var callText=type==='call-video'?'视频通话':'语音通话';
        bub='<div class="nc-inline-bub nc-inline-call" style="background:'+bubColor+';color:#222;display:flex;align-items:center;gap:8px;padding:10px 16px;"><span style="font-size:16px;">'+callIcon+'</span><span style="font-size:13px;">'+callText+'</span></div>';
    }else if(type==='voice'){
        var parts=content.split('|');var dur=parts[0].trim()||'3"';var vtxt=parts[1]?parts[1].trim():'';
        bub='<div class="nc-inline-bub" style="background:'+bubColor+';"><div class="nc-inline-voice"><div class="nc-inline-voice-bars"><span style="height:6px"></span><span style="height:10px"></span><span style="height:14px"></span><span style="height:8px"></span><span style="height:12px"></span></div><span class="nc-inline-voice-dur">'+dur+'</span></div>'+(vtxt?'<div style="font-size:11px;color:#222;margin-top:4px;">'+vtxt+'</div>':'')+'</div>';
    }else if(type==='image'){
        var iUrl=content,iAlt='';
        var iImgTag=content.match(/<img[^>]+src=["']([^"']+)["'][^>]*>/i);
        if(iImgTag){iUrl=iImgTag[1];var iAltM=content.match(/alt=["']([^"']*)["']/i);if(iAltM)iAlt=iAltM[1];}
        else{var cleanContent=content.replace(/^\[+/,'').replace(/\]+$/,'').trim();var iMd=cleanContent.match(/!\[([^\]]*)\]\(([^)]+)\)/);if(iMd){iAlt=iMd[1];iUrl=iMd[2];}else if(cleanContent.indexOf('|')>-1){var ip=cleanContent.split('|');iAlt=ip[0].trim();iUrl=ip.slice(1).join('|').trim();}else{iUrl=cleanContent;}}
        bub='<div class="nc-inline-bub" style="padding:4px;background:transparent!important;box-shadow:none;"><img src="'+iUrl+'" class="nc-inline-img" alt="'+iAlt.replace(/"/g,'&quot;')+'" style="max-width:160px;display:block;border-radius:10px;"></div>';
    }else if(type==='redpacket'){
        var rp=content.split('|');var amt=rp[0].trim()||'0.00';var note=rp[1]?rp[1].trim():'恭喜发财';
        bub='<div class="nc-inline-bub" style="background:'+bubColor+';"><div class="nc-inline-card"><div class="nc-inline-card-ic" style="background:linear-gradient(135deg,#ff6b6b,#ee5a5a);color:#fff;">¥</div><div><div class="nc-inline-card-tx">微信红包</div><div class="nc-inline-card-sub">¥'+amt+' · '+note+'</div></div></div></div>';
    }else if(type==='transfer'){
        var tf=content.split('|');var tamt=tf[0].trim()||'0.00';var ttitle=tf[1]?tf[1].trim():'转账';
        bub='<div class="nc-inline-bub" style="background:'+bubColor+';"><div class="nc-inline-card"><div class="nc-inline-card-ic" style="background:#1aad19;color:#fff;">¥</div><div><div class="nc-inline-card-tx">'+ttitle+'</div><div class="nc-inline-card-sub">¥ '+tamt+'</div></div></div></div>';
    }else{
        var safeTxt=content.replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/\n/g,'<br>');
        bub='<div class="nc-inline-bub" style="background:'+bubColor+';color:#222;">'+safeTxt+'</div>';
    }
    var nameHtml='<div class="nc-inline-name">'+name+'</div>';
    var contentHtml='<div class="nc-inline-content">'+nameHtml+bub+'</div>';
    if(dir==='nc-right'){
        return '<div class="nc-inline-row '+dir+'">'+contentHtml+avHtml+'</div>';
    }else{
        return '<div class="nc-inline-row '+dir+'">'+avHtml+contentHtml+'</div>';
    }
}
function ncRenderInlineBubbles(node){
    if(!node||node.nodeType!==1) return;
    if(node.getAttribute('data-nc-inline-done')) return;
    // 直接处理node的innerHTML，不查找子元素
    var textEl=node;
    if(!textEl||!textEl.innerHTML) return;
    var html=textEl.innerHTML;
    // 调试日志
    try{console.log('[Nicole] ncRenderInlineBubbles called, node:',node.tagName,'class:',node.className,'html前50:',html.substring(0,50));}catch(e){}
    // 支持{{char}}占位符，替换为当前角色名
    if(finalLName&&finalLName!=='角色'&&finalLName!=='Unknown'){html=html.replace(/\{\{char\}\}/g,finalLName);}
    var hasInlineM=/\[(微信|语音|红包|图片|转账|手机|微信文字|微信消息|手机消息|角色|我|角色语音|角色红包|角色图片|角色转账|角色表情|我语音|我红包|我图片|我转账|我表情|我电话|电话)[：:]/.test(html);if(!hasInlineM){var _cn=getCharNames();for(var _hi=0;_hi<_cn.length;_hi++){try{var _cne=_cn[_hi].replace(/[.*+?^${}()|[\]\\]/g,'\\$&');if(new RegExp('\\['+_cne+'(语音|表情|图片|红包|转账|电话)?[：:]').test(html)){hasInlineM=true;break;}}catch(e){}}}if(!hasInlineM) return;
    var isUser=ncGuessIsUser(node);
    // ===== 我专用（优先匹配，强制右侧）=====
    try{console.log('[Nicole] 开始匹配我格式, html包含[我::',html.indexOf('[我:')>-1);}catch(e){}
    html=html.replace(/\[我语音[：:]([^\]]*?)\]/g,function(m,t){return ncInlineBubbleHTML('voice',t.trim(),true);});
    html=html.replace(/\[我电话[：:](语音|视频)\]/g,function(m,t){return ncInlineBubbleHTML(t==='视频'?'call-video':'call-voice',t,true);});
    html=html.replace(/\[我电话[：:](?!语音|视频)([^\]]+)\]/g,function(m,t){return ncInlineBubbleHTML('text',t.trim(),true);});
    html=html.replace(/\[我红包[：:]([^\]]*?)\]/g,'');
    html=html.replace(/\[我图片[：:]([^\]]*?)\]/g,function(m,t){return ncInlineBubbleHTML('image',t.trim(),true);});
    html=html.replace(/\[我转账[：:]([^\]]*?)\]/g,'');
    html=html.replace(/\[我表情[：:]([^\]]*)\]/g,function(m,t){return ncInlineBubbleHTML('image',t.trim(),true);});
    html=html.replace(/\[我[：:]([\s\S]*?)\]/g,function(m,t){return ncInlineBubbleHTML('text',t.trim(),true);});
    // ===== 动态角色名格式（强制左侧）- 遍历所有别名 =====
    var charNames2=getCharNames();
    for(var cni2=0;cni2<charNames2.length;cni2++){
        try{
            var cnEsc2=charNames2[cni2].replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
            // 表情包格式：[角色名表情:URL] 或 [角色名表情:说明|URL]
            html=html.replace(new RegExp('\\['+cnEsc2+'表情[：:]([^\\]]*)\\]','g'),function(m,t){return ncInlineBubbleHTML('image',t.trim(),false);});
            html=html.replace(new RegExp('\\['+cnEsc2+'语音[：:]([^\\]]*?)\\]','g'),function(m,t){return ncInlineBubbleHTML('voice',t.trim(),false);});
            html=html.replace(new RegExp('\\['+cnEsc2+'电话[：:](语音|视频)\\]','g'),function(m,t){return ncInlineBubbleHTML(t==='视频'?'call-video':'call-voice',t,false);});
            html=html.replace(new RegExp('\\['+cnEsc2+'电话[：:](?!语音|视频)([^\\]]+)\\]','g'),function(m,t){return ncInlineBubbleHTML('text',t.trim(),false);});
            html=html.replace(new RegExp('\\['+cnEsc2+'红包[：:]([^\\]]*?)\\]','g'),'');
            html=html.replace(new RegExp('\\['+cnEsc2+'图片[：:]([^\\]]*?)\\]','g'),function(m,t){return ncInlineBubbleHTML('image',t.trim(),false);});
            html=html.replace(new RegExp('\\['+cnEsc2+'转账[：:]([^\\]]*?)\\]','g'),'');
            html=html.replace(new RegExp('\\['+cnEsc2+'[：:]([\\s\\S]*?)\\]','g'),function(m,t){return ncInlineBubbleHTML('text',t.trim(),false);});
        }catch(e){}
    }
    // ===== 角色专用（强制左侧）=====
    html=html.replace(/\[角色语音[：:]([^\]]*?)\]/g,function(m,t){return ncInlineBubbleHTML('voice',t.trim(),false);});
    html=html.replace(/\[角色电话[：:](语音|视频)\]/g,function(m,t){return ncInlineBubbleHTML(t==='视频'?'call-video':'call-voice',t,false);});
    html=html.replace(/\[角色红包[：:]([^\]]*?)\]/g,'');
    html=html.replace(/\[角色图片[：:]([^\]]*?)\]/g,function(m,t){return ncInlineBubbleHTML('image',t.trim(),false);});
    html=html.replace(/\[角色转账[：:]([^\]]*?)\]/g,'');
    html=html.replace(/\[角色表情[：:]([^\]]*)\]/g,function(m,t){return ncInlineBubbleHTML('image',t.trim(),false);});
    html=html.replace(/\[角色[：:]([\s\S]*?)\]/g,function(m,t){return ncInlineBubbleHTML('text',t.trim(),false);});
    // ===== 通用格式（按位置判断）=====
    html=html.replace(/\[(微信语音|语音)[：:]([^\]]*?)\]/g,function(m,k,t){return ncInlineBubbleHTML('voice',t.trim(),isUser);});
    html=html.replace(/\[电话[：:](语音|视频)\]/g,function(m,t){return ncInlineBubbleHTML(t==='视频'?'call-video':'call-voice',t,isUser);});
    html=html.replace(/\[电话[：:](?!语音|视频)([^\]]+)\]/g,function(m,t){return ncInlineBubbleHTML('text',t.trim(),isUser);});
    html=html.replace(/\[(微信红包|红包)[：:]([^\]]*?)\]/g,'');
    html=html.replace(/\[(微信图片|图片)[：:]([^\]]*?)\]/g,function(m,k,t){return ncInlineBubbleHTML('image',t.trim(),isUser);});
    html=html.replace(/\[(微信转账|转账)[：:]([^\]]*?)\]/g,'');
    html=html.replace(/\[(微信文字|微信消息|微信|手机消息|手机)[：:]([\s\S]*?)\]/g,function(m,k,t){return ncInlineBubbleHTML('text',t.trim(),isUser);});
    // 用户纯文本消息自动渲染成右侧气泡（没有标记格式的用户消息）
    if(isUser&&!html.includes('[我:')&&!html.includes('[我语音:')&&!html.includes('[我表情:')&&!html.includes('[我图片:')){
        var pureText=textEl.textContent||textEl.innerText||'';
        if(pureText&&pureText.trim().length>0&&pureText.trim().length<500&&!pureText.includes('[')&&!pureText.includes('{')&&!pureText.includes('#')&&!pureText.includes('```')){
            try{
                var safePure=pureText.trim().replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/\n/g,'<br>');
                html=ncInlineBubbleHTML('text',safePure,true);
                console.log('[Nicole] 用户纯文本消息自动渲染气泡');
            }catch(e){}
        }
    }
    textEl.innerHTML=html;
    node.setAttribute('data-nc-inline-done','1');
}

})();

