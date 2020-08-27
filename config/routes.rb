Rails.application.routes.draw do
  root to: 'posts#index' 
# get 'posts/new', to: 'posts#new' ←削除
  post 'posts', to: 'posts#create'
  get 'posts/:id', to: 'posts#checked'
end