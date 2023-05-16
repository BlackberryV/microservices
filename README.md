# запуск проекту
# ввести наступні команди в корінній директорії проекту

kind create cluster --config ./k8s/Common/cluster.yaml

kubectl apply -f ./k8s/Common/ingress.yaml

# в папці helm пишемо

helm install local v5

готово до використовування
