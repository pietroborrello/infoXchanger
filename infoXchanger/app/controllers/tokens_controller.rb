class TokensController < ApplicationController
  @all_info = ''
  def create
    @user = current_user
    @token = @user.tokens.create(user: @user, password: '', info: @all_info)
    redirect_to user_token_path
  end
end
