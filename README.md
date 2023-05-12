# запуск проекту
# ввести наступні команди в корінній директорії проекту

kind create cluster --config ./k8s/Common/cluster.yaml

kubectl apply -f ./k8s/Common/ingress.yaml

kubectl apply -f ./k8s/postgres-products

kubectl apply -f ./k8s/postgres

kubectl apply -f ./k8s/sellers

kubectl apply -f ./k8s/products

готово до використовування
