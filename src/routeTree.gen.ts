/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as OrderListImport } from './routes/orderList'
import { Route as ListImport } from './routes/list'
import { Route as CartImport } from './routes/cart'
import { Route as IndexImport } from './routes/index'
import { Route as OrderOrderIdImport } from './routes/order_.$orderId'
import { Route as OrderListOrderIdImport } from './routes/orderList_.$orderId'
import { Route as ListProductIdImport } from './routes/list_.$productId'

// Create/Update Routes

const OrderListRoute = OrderListImport.update({
  path: '/orderList',
  getParentRoute: () => rootRoute,
} as any)

const ListRoute = ListImport.update({
  path: '/list',
  getParentRoute: () => rootRoute,
} as any)

const CartRoute = CartImport.update({
  path: '/cart',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const OrderOrderIdRoute = OrderOrderIdImport.update({
  path: '/order/$orderId',
  getParentRoute: () => rootRoute,
} as any)

const OrderListOrderIdRoute = OrderListOrderIdImport.update({
  path: '/orderList/$orderId',
  getParentRoute: () => rootRoute,
} as any)

const ListProductIdRoute = ListProductIdImport.update({
  path: '/list/$productId',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/cart': {
      preLoaderRoute: typeof CartImport
      parentRoute: typeof rootRoute
    }
    '/list': {
      preLoaderRoute: typeof ListImport
      parentRoute: typeof rootRoute
    }
    '/orderList': {
      preLoaderRoute: typeof OrderListImport
      parentRoute: typeof rootRoute
    }
    '/list/$productId': {
      preLoaderRoute: typeof ListProductIdImport
      parentRoute: typeof rootRoute
    }
    '/orderList/$orderId': {
      preLoaderRoute: typeof OrderListOrderIdImport
      parentRoute: typeof rootRoute
    }
    '/order/$orderId': {
      preLoaderRoute: typeof OrderOrderIdImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren([
  IndexRoute,
  CartRoute,
  ListRoute,
  OrderListRoute,
  ListProductIdRoute,
  OrderListOrderIdRoute,
  OrderOrderIdRoute,
])

/* prettier-ignore-end */
