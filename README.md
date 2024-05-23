Templated from https://github.com/dev-xo/remix-saas

# TODO
  - Customer deletion events are not handled from stripe webhook
  - DB Seed should listen to the stripe hook events, such as "price.created" and add a database entry if it does not exist. 