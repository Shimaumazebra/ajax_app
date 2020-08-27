function check() {
    //querySelectorAllメソッドで、postをクラス名にもつ要素を取得。postというクラス名を持つ要素はメモの数だけ存在。
    //この複数取得した要素に対して、forEachで繰り返し処理を行い要素1つずつに対して処理を行う
  const posts = document.querySelectorAll(".post");
  posts.forEach(function (post) {
    //1度処理をするものにはpost.setAttribute("data-load", "true");を実行し、data-loadという要素を追加
    if (post.getAttribute("data-load") != null) {
      //2回目以降はdata-loadがnullではないもの、すなわち処理済みであるメモの場合には、処理を中断させる
      return null;
    }
    post.setAttribute("data-load", "true");
    //addEventListenerメソッドを使用し、引数にclickの指定
    post.addEventListener("click", () => { 
      //getAttributeで属性値を取得することができるので、メモのidを取得
      const postId = post.getAttribute("data-id");
      //変数XHRから、XMLHttpRequestのメソッドを使用できるようになった
      const XHR = new XMLHttpRequest();
      //openメソッドを使用してリクエストの詳細を指定
      XHR.open("GET", `/posts/${postId}`, true);
      //レスポンスの型を指定
      XHR.responseType = "json";
      //リクエストの送信
      XHR.send();
      XHR.onload = () => {
        //HTTPステータスコードが200以外の場合、ifはtrueとなり、アラートを表示する処理
        if (XHR.status != 200) {
          alert(`Error ${XHR.status}: ${XHR.statusText}`);
          //return null;によってJavaScriptの処理から抜け出す
          return null;          
        }
        //checkedアクションで返却したitemは、XHR.response.postで取得
        const item = XHR.response.post;
        //既読であれば先ほどHTMLに定義した属性であるdata-checkの属性値にtrueをセット
        if (item.checked === true) {
          post.setAttribute("data-check", "true");
          //未読であればdata-checkは属性ごと削除します
        } else if (item.checked === false) {
          post.removeAttribute("data-check");
        }
      };
    });
  });
}
setInterval(check, 1000);