# запуск проекту

# ввести наступні команди в корінній директорії проекту

перейшов на minikube через те, що були проблеми з оперативною пам'яттю, якої не вистачало для логування

minikube start

minikube addons enable ingress

# для логування пишемо

kubectl apply -f k8s/logging

kubectl port-forward svc/kibana-np 8080 


# для helm пишемо

helm dep build helm/v5/charts/orders

helm dep build helm/v5/charts/sellers

helm dep build helm/v5/charts/products

helm dep build helm/v5

helm install name helm/v5

# для моніторингу пишемо 

kubectl create namespace monitoring 

helm repo add prometheus-community https://prometheus-community.github.io/helm-charts

helm install --namespace monitoring prometheus prometheus-community/kube-prometheus-stack

kubectl port-forward -n monitoring svc/prometheus-kube-prometheus-prometheus  9090

kubectl port-forward --namespace monitoring service/prometheus-grafana 3000:80

# отримуємо пароль та логін для графани

kubectl get secret --namespace monitoring prometheus-grafana -o jsonpath="{.data.admin-password}" | base64 --decode; echo 

kubectl get secret --namespace monitoring prometheus-grafana -o jsonpath="{.data.admin-user}" | base64 --decode; echo 

# робота логування 

![telegram-cloud-photo-size-2-5458593384278116477-y](https://github.com/BlackberryV/microservices/assets/86734171/6b5af4dc-76ff-4870-8973-fa1b07cbb95e)

# робота моніторингу

# prometheus

![telegram-cloud-photo-size-2-5458593384278116500-y](https://github.com/BlackberryV/microservices/assets/86734171/5863a59d-4bf8-4210-ab85-736ddff1d7b9)

![telegram-cloud-photo-size-2-5458593384278116502-y](https://github.com/BlackberryV/microservices/assets/86734171/1ae02144-f736-44dc-83be-b88f723d2d1f)

![telegram-cloud-photo-size-2-5458593384278116503-y](https://github.com/BlackberryV/microservices/assets/86734171/0f7c7b5c-60fd-45f0-899c-e273452f429d)

![telegram-cloud-photo-size-2-5458593384278116504-y](https://github.com/BlackberryV/microservices/assets/86734171/6746f6a3-018d-46fc-8c58-756871457258)

![telegram-cloud-photo-size-2-5458593384278116506-y](https://github.com/BlackberryV/microservices/assets/86734171/a0e1c9a6-1107-4cae-a1db-4fc85847ee52)

# grafana

![telegram-cloud-photo-size-2-5458593384278116516-y](https://github.com/BlackberryV/microservices/assets/86734171/517a751f-29b3-4fc7-a7e9-a5b2fc9afed2)

![telegram-cloud-photo-size-2-5458593384278116522-y](https://github.com/BlackberryV/microservices/assets/86734171/d98b504e-7070-4682-a2d3-619a45fc2995)

![telegram-cloud-photo-size-2-5458593384278116527-y](https://github.com/BlackberryV/microservices/assets/86734171/205c2502-bf3e-4363-bc5f-c16aeb57893e)


