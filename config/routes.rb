Rails.application.routes.draw do
  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'
  root 'home#index'

  get 'scannedtokens/scanned'
  get 'scannedtokens/whoscannedme'
  get 'tokens/mytokens'
  get 'blockedusers/show'
  get 'scan', to: 'home#scan'
  post 'download', to:'home#download'
  get 'users/myprofile'
  get 'users/show'
  get 'users' => 'users#users'
  get 'users/search', to: 'users#search'
  get 'users/select', to: 'users#select'
  get 'users/token', to: 'users#token'
  get 'users/blockeduser', to: 'users#blockeduser'
  devise_for :users, controllers: {:omniauth_callbacks => "users/omniauth_callbacks", sessions: 'users/sessions', registrations: 'users/registrations', passwords: 'users/passwords' }
  resources :users do
	resources :blockedusers
    resources :tokens
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end