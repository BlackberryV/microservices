# запуск проекту

# ввести наступні команди в корінній директорії проекту

kind create cluster --config ./k8s/Common/cluster.yaml

kubectl apply -f ./k8s/Common/ingress.yaml

kubectl apply -f k8s/logging

# для helm пишемо

helm dep build helm/v5/charts/orders

helm dep build helm/v5/charts/sellers

helm dep build helm/v5/charts/products

helm install name helm/v5

готово до використовування
