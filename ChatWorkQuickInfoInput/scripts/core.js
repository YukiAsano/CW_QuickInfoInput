// {{{

/*
 * チャット画面かチェック
 */
function isChatPage() {
    var ret = false,
    statusBtn = document.getElementById("_myStatusButton");
    if (!!statusBtn) {
        ret = true;
    }
    return ret;
}

// }}}
// {{{

/*
 * ツールバーのボタン生成
 * {
 *     "id": [id],
 *     "label": [マウスオーバー時のコメント],
 *     "iconCls": [アイコンのクラス]
 * }
 */
function getButtonEl(args){

    // {{{ 初期化

    var wrapEl, el, innerEl;

    // }}}
    // {{{ ボタン生成

    wrapEl = document.createElement("li");
    wrapEl.style.marginRight = "8px";
    el = document.createElement("button");
    el.setAttribute("role", "button");
    el.className = "_showDescription chatInput__emoticon dmLRfL";
    el.style.display = "inline-block";

    // ボタンによって変える部分
    el.id = args.id;
    el.setAttribute("aria-label", args.label);

    // }}}
    // {{{ ボタンの中身を生成

    innerEl = document.createElement("span");
    innerEl.className = args.iconCls;
    innerEl.style.color = args.color || undefined;
    innerEl.innerHTML = args.html ? args.html : "";

    // ボタンによって変える部分
    innerEl.className += args.iconNoLg ? "" : " icoSizeMiddle";
    innerEl.style.paddingBottom = "8px";

    // スタイルを調整
    for (var property in args.style) {
        if (args.style.hasOwnProperty(property)) {
            innerEl.style[property] = args.style[property];
        }
    }

    // }}}
    // {{{ 中身を入れて、返す

    el.appendChild(innerEl);
    wrapEl.appendChild(el);
    return wrapEl;

    // }}}
}

// }}}
// {{{

function createToolButtons() {

    var infoBtn,
        infoWithTitleBtn,
        codeBtn,
        qtBtn,
        hrBtn,
        chatToolbarEl = document.getElementById("_file").closest('ul'),
        actionFn = function(action, bTitle, bNoEnd) {
            var el,
                startTag = "["+action+"]",
                endTag = bNoEnd ? "" : "[/"+action+"]",
                startTtlTag = "[title]",
                endTtlTag = "[/title]",
                ttlText,
                oldText,
                selectText = "",
                startPoint,
                endPoint,
                newPoint;


            if (bTitle) {
                // タイトルつきの場合
                ttlText = prompt("タイトルを入力", "");
                if (!ttlText) {
                    return false;
                }
                startTag += startTtlTag;
                startTag += ttlText;
                startTag += endTtlTag;
            }

            // テキストエリア取得
            el = document.getElementById("_chatText"),

            // 元のテキスト
            oldText = el.value;

            // カーソル位置
            startPoint = el.selectionStart;
            endPoint = el.selectionEnd;

            // 新しいカーソル位置
            newPoint = startPoint + startTag.length;

            if (startPoint != endPoint) {
                // 選択中の文字取得
                selectText = oldText.substr(startPoint, endPoint - startPoint);

                newPoint = endPoint + startTag.length + endTag.length;
            }

            // テキストをカーソル位置に入れる
            el.value = oldText.substr(0, startPoint) + startTag + selectText + endTag + oldText.substr(endPoint);

            // カーソル位置の移動
            el.setSelectionRange(newPoint, newPoint);

            // フォーカスを当ててそのまま送信できるように
            el.focus();
        };

    // {{{ infoタグ生成のボタン

    infoBtn = getButtonEl({
        id: "_infoText",
        label: "メッセージに[info][/info]を追加します（Ctrl+i）",
        iconCls: "icoFontInfo"
    });

    infoBtn.addEventListener("click", function() {
        actionFn("info", false, false);
    }, false);

    chatToolbarEl.appendChild(infoBtn);

    // }}}
    // {{{ infoタグ（タイトル付き）生成のボタン

    infoWithTitleBtn = getButtonEl({
        id: "_infoWithTitleText",
        label: "メッセージに[info][title][/title][/info]を追加します",
        iconCls: "icoFontInfo",
        color: "blue"
    });

    infoWithTitleBtn.addEventListener("click", function() {
        actionFn("info", true, false);
    }, false);

    chatToolbarEl.appendChild(infoWithTitleBtn);

    // }}}
    // {{{ codeタグ生成のボタン

    codeBtn = getButtonEl({
        id: "_insertCodeText",
        label: "メッセージに[code][/code]を追加します",
        iconCls: "icoFontSetting"
    });

    codeBtn.addEventListener("click", function() {
        actionFn("code", false, false);
    }, false);

    chatToolbarEl.appendChild(codeBtn);

    // }}}
    // {{{ qtタグ生成のボタン

    qtBtn = getButtonEl({
        id: "_insertQtText",
        label: "メッセージに[qt][/qt]を追加します",
        iconCls: "icoFontMessegeQuote",
        iconNoLg: true
    });

    qtBtn.addEventListener("click", function() {
        actionFn("qt", false, false);
    }, false);

    chatToolbarEl.appendChild(qtBtn);

    // }}}
    // {{{ hrタグ生成のボタン

    hrBtn = getButtonEl({
        id: "_insertHrText",
        label: "メッセージに[hr]を追加します（Ctrl+Alt+l）",
        iconCls: "btnPrimary",
        iconNoLg: true,
        html: "&nbsp;hr&nbsp;",
        style: {
            fontSize: '10px',
            borderRadius: '3px',
            padding: '3px 4px',
            position: 'relative',
            top: '-2px'
        }
    });

    hrBtn.addEventListener("click", function() {
        actionFn("hr", false, true);
    }, false);

    chatToolbarEl.appendChild(hrBtn);

    // }}}
    // {{{ キーボードショートカット

    document.getElementById("_chatText").addEventListener("keydown", function(e) {
        var code = e.which,
            keyChar = String.fromCharCode(code).toLowerCase();
        if (e.ctrlKey) {
            if (keyChar === "i") {
                // info追加
                actionFn("info", false, false);
            } else if (keyChar === "t") {
                // titleつきでinfo追加
                actionFn("info", true, false);
            } else if (keyChar === "w") {
                // code追加
                actionFn("code", false, false);
            } else if (keyChar === "l") {
                // hr追加
                actionFn("hr", false, true);
            }
        }
    }, false);

    // }}}
}

var reloadFn = function(bInit) {
    var cnt = 100;
    var intervalFn = setInterval(function () {
        //console.log(cnt);
        if (!cnt || document.getElementById('_infoText') != null) {
            clearInterval(intervalFn);
            return false;
        }
        if (isChatPage()) {
            createToolButtons();
            clearInterval(intervalFn);
            //console.log('created!');
            if (bInit) {
                document.getElementById("_chatSendArea").addEventListener("DOMSubtreeModified", function(e) {
                    reloadFn(false);
                }, false);
                //console.log('init end');
            }
            return false;
        }
        --cnt;
    }, 100);
}
reloadFn(true);

// }}}
