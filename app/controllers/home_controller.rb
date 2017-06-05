class HomeController < ApplicationController
  def index
    if params[:t]
      redirect_to users_show_path t: params[:t]
    end
  end

  def scan
  end

  def download
    if params[:data]
      @qr = RQRCode::QRCode.new(params[:data], :size => 6, :level => :h )
      send_data @qr.as_png(
          resize_gte_to: false,
          resize_exactly_to: false,
          fill: 'white',
          color: 'black',
          size: 520,
          border_modules: 4,
          module_px_size: 6,
          file: nil # path to write
          ),
      filename: 'qrcode.png',
      type: 'image/png'
    end
  end
end
