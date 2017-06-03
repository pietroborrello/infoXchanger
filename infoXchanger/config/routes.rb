Rails.application.routes.draw do
  get 'scannedtokens/scanned'

  root 'home#index'

  get 'scan', to: 'home#scan'
  get 'scanned', to: 'scannedtokens#scanned'
  post 'download', to:'home#download'
  get 'users/myprofile'
  get 'users/show'
  get 'users' => 'users#users'
  get 'users/search', to: 'users#search'
  get 'users/select', to: 'users#select'
  get 'users/token', to: 'users#token'
  devise_for :users, controllers: {:omniauth_callbacks => "users/omniauth_callbacks", sessions: 'users/sessions', registrations: 'users/registrations', passwords: 'users/passwords' }
  resources :users do
    resources :tokens
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
