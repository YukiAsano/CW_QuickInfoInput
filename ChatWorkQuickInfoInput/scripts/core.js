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

    var el, innerEl;

    // }}}
    // {{{ ボタン生成

    el = document.createElement("li");
    el.setAttribute("role", "button");
    el.className = "_showDescription";
    el.style.display = "inline-block";

    // ボタンによって変える部分
    el.id = args.id;
    el.setAttribute("aria-label", args.label);

    // }}}
    // {{{ ボタンの中身を生成

    innerEl = document.createElement("span");
    innerEl.className = "icoSizeLarge";
    innerEl.style.color = args.color || undefined;


    // ボタンによって変える部分
    innerEl.className += " ";
    innerEl.className += args.iconCls;

    // }}}
    // {{{ 中身を入れて、返す

    el.appendChild(innerEl);
    return el;

    // }}}
}

// }}}
// {{{

// チャット画面かチェック
if (isChatPage()) {

    var infoBtn,
        infoWithTitleBtn,
        chatToolbarEl = document.getElementById("_chatSendTool"),
        infoFn = function(bTitle) {
            var el,
                startTag = "[info]",
                endTag = "[/info]",
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

        };

    // infoタグ生成のボタン
    infoBtn = getButtonEl({
        id: "_infoText",
        label: "メッセージに[info][/info]を追加します",
        iconCls: "icoFontInfo"
    });

    infoBtn.addEventListener('click', function() {
        infoFn(false);
    }, false);

    chatToolbarEl.appendChild(infoBtn);

    // infoタグ生成のボタン
    infoWithTitleBtn = getButtonEl({
        id: "_infoText",
        label: "メッセージに[info][title][/title][/info]を追加します",
        iconCls: "icoFontInfo",
        color: "blue"
    });

    infoWithTitleBtn.addEventListener('click', function() {
        infoFn(true);
    }, false);

    chatToolbarEl.appendChild(infoWithTitleBtn);

    // キーボードショートカット
    document.getElementById('_chatText').addEventListener('keydown', function(e) {
        var code = e.which,
            keyChar = String.fromCharCode(code).toLowerCase();
        if (e.ctrlKey) {
            if (keyChar === 'i') {
                // info追加
                infoFn(false);
            } else if (keyChar === 't') {
                // titleつきでinfo追加
                infoFn(true);
            }
        }
    }, false);

}

// }}}
