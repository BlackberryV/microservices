# запуск проекту

# ввести наступні команди в корінній директорії проекту

kind create cluster --config ./k8s/Common/cluster.yaml

kubectl apply -f ./k8s/Common/ingress.yaml

# еплаїмо rabitmq

kubectl apply -f "https://github.com/rabbitmq/cluster-operator/releases/latest/download/cluster-operator.yml"

kubectl apply -f https://raw.githubusercontent.com/rabbitmq/cluster-operator/main/docs/examples/hello-world/rabbitmq.yaml

# отримаємо пароль та ім'я юзера для того, щоб вставити їх в посилання для конекту, також форвардимо порт для роботи з rabitmq

kubectl get secret hello-world-default-user -o jsonpath='{.data.username}'

kubectl get secret hello-world-default-user -o jsonpath='{.data.password}'

kubectl port-forward "service/hello-world" 15672

# для helm пишемо

helm dep build helm/v5/charts/orders

helm dep build helm/v5/charts/sellers

helm dep build helm/v5/charts/products

helm install name v5

готово до використовування
