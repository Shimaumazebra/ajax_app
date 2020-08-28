function memo() {
  //「投稿する」ボタンの情報を取得
  const submit = document.getElementById("submit");
  //投稿するボタンを「click」した場合に実行される関数を定義
  submit.addEventListener("click", (e) => {
    //①メモ投稿のフォームに入力された情報を送信→定義
    const formData = new FormData(document.getElementById("form"))
    //非同期通信にするためにオブジェクトを作成
    const XHR = new XMLHttpRequest();
    //リクエストの内容を引数へ追記。HTTPメソッドはPOST、パスは/posts、非同期通信はtrue
    XHR.open("POST", "/posts", true);
    //レスポンスの形式を定義
    XHR.responseType = "json";
    //②メモ投稿のフォームに入力された情報を送信→送信
    XHR.send(formData);
    XHR.onload = () => {
      //HTTPステータスコードが200以外の場合、ifはtrueとなり、アラートを表示する処理
      if (XHR.status != 200) {
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
        //return null;によってJavaScriptの処理から抜け出す
        return null;
      }
      //itemは、レスポンスとして返却されたメモのレコードデータを取得
      const item = XHR.response.post;
      //listは、HTMLを描画する場所を指定する際に使用する「描画する親要素」のlistの要素を取得
      const list = document.getElementById("list");
      //メモの入力フォームをリセットするため
      const formText = document.getElementById("content");
      //メモとして描画する部分のHTMLを定義
      const HTML = `
        <div class="post" data-id=${item.id}>
          <div class="post-date">
            投稿日時：${item.created_at}
          </div>
          <div class="post-content">
          ${item.content}
          </div>
        </div>`;
        //listという要素に対して、insertAdjacentHTMLでHTMLを追加。
        //第一引数にafterendを指定することで、要素listの直後に挿入
      list.insertAdjacentHTML("afterend", HTML);
      //メモの入力フォームに入力されたままの文字を空で上書きしてリセットするコード
      formText.value = "";
    };
    //プログラム本来の処理を止める
    e.preventDefault();
  });
}
// window（ページ）をload（読み込み）時に関数memoが実行される
window.addEventListener("load", memo);