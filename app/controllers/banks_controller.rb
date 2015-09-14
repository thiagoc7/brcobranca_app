class BanksController < ApplicationController
  before_action :set_bank, only: [:edit, :update, :destroy]

  def index
    @banks = Bank.all
  end

  def new
    @bank = Bank.new
  end

  def edit
  end

  def create
    @bank = Bank.new(bank_params)

    if @bank.save
      flash[:success] = "Created!"
      redirect_to banks_path
    else
      render :new
    end
  end

  def update
    if @bank.update(bank_params)
      flash[:success] = "Updated!"
      redirect_to banks_path
    else
      render :edit
    end
  end

  def destroy
    @bank.destroy
    flash[:fail] = "Destroyed!"
    redirect_to banks_path
  end

  private
    def set_bank
      @bank = Bank.find(params[:id])
    end

    def bank_params
      params.require(:bank).permit(
          :default_bank,
          :name,
          :cedente,
          :cedente_doc,
          :cedente_address,
          :agencia,
          :conta_corrente,
          :variacao,
          :aceite,
          :carteira,
          :convenio,
          :instrucao_juros
      )
    end
end
