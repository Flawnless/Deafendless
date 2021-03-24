   const deafen_regex = /self_deafs.truem/;
        const decoder = new TextDecoder();
        
        WebSocket.prototype._send = WebSocket.prototype.send;
        WebSocket.prototype.send = function (data) {
            if (data instanceof ArrayBuffer && deafen_regex.test(decoder.decode(data))) {
                window.deafen = (function () {
                    this._send(data);
                    let fake_deafen_btn = document.getElementById('FkDeafen');
                    fake_deafen_btn.style.backgroundColor = "#de212e"
                }).bind(this);
        
                if (!document.querySelector("button[aria-label='Deafen'][style]")) {
                    let deafen_btn = document.querySelector("button[aria-label='Deafen']");
                    let fake_deafen_btn = deafen_btn.cloneNode(true);
                    fake_deafen_btn.id = "FkDeafen";
                    fake_deafen_btn.style.backgroundColor = "#2F3136";
                    fake_deafen_btn.onclick = () => window.deafen();
                    deafen_btn.parentNode.insertBefore(fake_deafen_btn, deafen_btn);
                }
                
            }
            if (status === false) return;
            this._send(data);
        } 
        document.querySelector("button[aria-label='Mute']").onclick = ()=>{
        };
        document.querySelector("button[aria-label='Deafen']").onclick = ()=>{
        };
