Rails.application.routes.draw do
  root 'home#index'

  resources :users, only: [:show]
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  
end
