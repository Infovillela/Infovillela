function copyCode() {
    var codeContent = document.getElementById("codeContent");
    var range = document.createRange();
    range.selectNode(codeContent);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand("copy");
    window.getSelection().removeAllRanges();

    alert("Código copiado para a área de transferência!");
}

var newwindow = ''
    function popitup(url) {
    if (newwindow.location && !newwindow.closed) {
        newwindow.location.href = url;
        newwindow.focus(); }
    else {
        newwindow=window.open(url,'htmlname','width=1920,height=1080,resizable=1');}
    }

    function tidy() {
    if (newwindow.location && !newwindow.closed) {
      newwindow.close(); }
    }