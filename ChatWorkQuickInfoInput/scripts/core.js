/**
 * イベント設定
 */
const handler = (() => {
    const events = {}
    let key = 0
    return {
        addListener (target, type, listener, capture) {
            target.addEventListener(type, listener, capture)
            events[key] = {
                target: target,
                type: type,
                listener: listener,
                capture: capture
            }
            return key++
        },
        removeListener (k) {
            if (k in events) {
                var e = events[k]
                e.target.removeEventListener(e.type, e.listener, e.capture)
            }
            if (!events.length) {
                key = 0
            }
        }
    }
})()

/**
 * ボタン定義
 */
const btns = [
    {
        id: '_infoText',
        label: 'メッセージに[info][/info]を追加します（Ctrl+i）',
        iconCls: 'icoFontInfo',
        params: {
            action: 'info',
            addEndTag: true
        }
    }, {
        id: '_infoWithTitleText',
        label: 'メッセージに[info][title][/title][/info]を追加します（Ctrl+t）',
        iconCls: 'icoFontInfo',
        color: 'blue',
        params: {
            action: 'info',
            addEndTag: true,
            addTitle: true
        }
    }, {
        id: '_insertCodeText',
        label: 'メッセージに[code][/code]を追加します（Ctrl+w）',
        iconCls: 'icoFontSetting',
        params: {
            action: 'code',
            addEndTag: true
        }
    }, {
        id: '_insertQtText',
        label: 'メッセージに[qt][/qt]を追加します',
        iconCls: 'icoFontMessegeQuote',
        iconNoLg: true,
        params: {
            action: 'qt',
            addEndTag: true
        }
    }, {
        id: '_insertHrText',
        label: 'メッセージに[hr]を追加します（Ctrl+Alt+l）',
        iconCls: 'btnPrimary',
        iconNoLg: true,
        html: '&nbsp;hr&nbsp;',
        style: {
            fontSize: '10px',
            borderRadius: '3px',
            padding: '3px 4px',
            position: 'relative',
            top: '-2px'
        },
        params: {
            action: 'hr',
        }
    }
]

/**
 * メイン処理
 */
const app = {
    // ボタンに設定したイベントのキー
    btnEventKeys: [],

    /**
     * 初期化
     */
    init () {
        const me = this
        me.reload(true)
    },

    /**
     * チャットページかどうか
     */
    isChatPage () {
        return !!document.getElementById('_myStatusButton')
    },

    /**
     * 画面更新時処理
     */
    reload (init) {
        const me = this
        let intervalFn, cnt = 100

        if (!!document.getElementById('_infoText')) {
            return false
        }

        intervalFn = setInterval(() => {
            if (!cnt || !!document.getElementById('_infoText')) {
                clearInterval(intervalFn)
                return false
            }
            if (me.isChatPage()) {
                //console.log(cnt);
                me.createToolBtns()
                clearInterval(intervalFn)
                if (init) {
                    document.getElementById('_chatSendArea').addEventListener('DOMSubtreeModified', (e) => {
                        me.reload(false)
                    }, false)
                }
            }
            --cnt
        }, 100)
    },

    /**
     * ボタン設置
     */
    createToolBtns () {
        console.log('createToolBtns');
        const me = this,
            chatToolbarEl = document.getElementById('_file').closest('ul')

        me.btnEventKeys.forEach(k => {
            handler.removeListener(k)
            console.log(k)
        })

        me.btnEventKeys = []

        btns.forEach(o => {
            const btn = me.createBtn(o)
            let k = handler.addListener(btn, 'click', () => {
                me.clickAction(o.params)
            })
            chatToolbarEl.appendChild(btn)
            me.btnEventKeys.push(k)
        })


        let k = handler.addListener(document.getElementById('_chatText'), 'keydown', (e) => {
            let code = e.which,
                keyChar = String.fromCharCode(code).toLowerCase();
            if (e.ctrlKey) {
                //console.log('push');
                //console.log(keyChar);
                if (keyChar === 'i') {
                    me.clickAction(btns[0].params)
                } else if (keyChar === 't') {
                    me.clickAction(btns[1].params)
                } else if (keyChar === 'w') {
                    me.clickAction(btns[2].params)
                } else if (keyChar === 'l') {
                    me.clickAction(btns[4].params)
                }
            }
        }, false);
        me.btnEventKeys.push(k)
    },

    /**
     * ボタン生成
     */
    createBtn (args) {
        const li = document.createElement('li'),
            btn = document.createElement('button'),
            span = document.createElement('span')

        li.style.marginRight = '8px'

        btn.id = args.id
        btn.setAttribute('role', 'button')
        btn.setAttribute('aria-label', args.label)
        btn.classList.add('_showDescription', 'chatInput__emoticon', 'dmLRfL', 'bPTIFV')
        btn.style.display = 'inline-block'

        span.classList.add(args.iconCls || null)
        args.iconNoLg || span.classList.add('icoSizeMiddle')
        span.style.color = args.color || undefined
        span.style.paddingBottom = '8px'
        span.innerHTML = args.html || ''

        // スタイルを調整
        for (let property in args.style) {
            if (args.style.hasOwnProperty(property)) {
                span.style[property] = args.style[property]
            }
        }
        btn.appendChild(span)
        li.appendChild(btn)
        return li
    },

    /**
     * クリック時処理
     */
    clickAction (args) {
        const el = document.getElementById('_chatText'),
            action = args.action || 'info',
            startTag = '[' + action + ']',
            endTag = !!args.addEndTag ? '[/' + action + ']' : '',
            beforeText = el.value,
            start = el.selectionStart,
            end = el.selectionEnd

        let titleTag = '', titleText = '',
            cursor = start, selectText = ''

        if (args.addTitle) {
            if (!(titleText = prompt('タイトルを入力', ''))) {
                return false
            }
            titleTag = [
                '[title]',
                    titleText,
                '[/title]'
            ].join('')
        }

        if (start !== end) {
            selectText = beforeText.substr(start, end - start)
            cursor = end + endTag.length
        }
        cursor += startTag.length + titleTag.length

        setTimeout(() => {
            el.value = [
                beforeText.substr(0, start),
                startTag,
                titleTag,
                selectText,
                endTag,
                beforeText.substr(end)
            ].join('')

            el.setSelectionRange(cursor, cursor)
            el.focus()
        }, 10);
    }
}
app.init()
