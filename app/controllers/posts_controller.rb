class PostsController < ApplicationController

  def index
    @posts = Post.all.order(id: "DESC")
  end
 
   # 削除
   # def new
   # end
 
   def create
    # 既読や未読の情報を追加したため「メモ作成時に未読の情報を保存するようにしたこと
    post = Post.create(content: params[:content], checked: false)
    # Ajaxを実現するため「レスポンスをJSONに変更したこと」
    render json:{ post: post }
  end

  def checked
    post = Post.find(params[:id]) # 先ほど設定したURLパラメーターから、既読したメモのidが渡されるように設定するので、そのidを使用して該当するレコードを取得しています。
    if post.checked 
      post.update(checked: false)
    else
      post.update(checked: true)
    end
    # if文で、post.checkedという既読であるか否かを判定するプロパティを指定し、既読であれば「既読を解除するためにfalseへ変更」し、既読でなければ「既読にするためtrueへ変更」します。
    # この時はupdateというActiveRecordのメソッドを使用して更新しています。
    item = Post.find(params[:id])
    render json: { post: item }
    # 最後に、更新したレコードをitem = Post.find(params[:id])で取得し直し、render json:{ post: item }でJSON形式（データ）としてchecked.jsに返却しています
  end
 end