import React from "react"
import { Provider } from "react-redux"
import App, { AppContext } from "next/app"
import withRedux from "next-redux-wrapper"
import { initStore, ReduxStoreInstance } from "../store"
import Header from "../components/layouts/Header"
import Message from "../components/atoms/SuccessMessage"

type Props = {
    store: ReduxStoreInstance
}

export default withRedux(initStore)(
    class extends App<Props> {
        static async getInitialProps({ Component, ctx }: AppContext) {
            let pageProps = {}
            if (Component.getInitialProps) {
                pageProps = await Component.getInitialProps(ctx)
            }
            return { pageProps }
        }

        render() {
            const { Component, pageProps, store } = this.props
            return (
                <Provider store={store}>
                    <Header />
                    <Message />
                    <Component {...pageProps} />
                    <style jsx global>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        a{
            cursor: pointer;
            text-decoration: none;
        }
      `}</style>
                </Provider>
            )
        }
    }
)