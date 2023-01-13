import React from 'react'
import ErrorHandler from '../../components/errorhandler/ErrorHandler'
import Loading from '../../components/loading/Loading'

const MoneyPayoutResponse = ({msg, isLoaded}) => {

  return (
    isLoaded ? <ErrorHandler msg={msg} hrefMsg={'Powrót do profilu'} hrefUrl={'/profile'}/> : <Loading />
  )
}

export default MoneyPayoutResponse