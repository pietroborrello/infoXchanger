require 'rqrcode'

class QrtokensController < ApplicationController

def index
end

def show
  if session[:token]
    @token = session[:token]
    @qr = RQRCode::QRCode.new(@token , :size => 4, :level => :h )
  else
    render new
  end
end

def new 
end

def create
  session[:token] = params.require(:qrtoken).permit(:token)[:token]
  #render plain: flash[:token].inspect
  redirect_to action: "show", id: 0
end

end
