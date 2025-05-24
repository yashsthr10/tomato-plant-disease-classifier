from ts.torch_handler.image_classifier import ImageClassifier
import torch
import os
import json
from torchvision import transforms

class Model_handler(ImageClassifier):
    def __init__(self):
        super(Model_handler, self).__init__()
        self.mapping = None
        self.image_processing = transforms.Compose([
            transforms.Resize((224, 224)),
            transforms.ToTensor(),
            transforms.Normalize([0.485, 0.456, 0.406],
                                 [0.229, 0.224, 0.225])
        ])

    def initialize(self, ctx):
        super().initialize(ctx)
        # Load class map
        model_dir = ctx.system_properties.get("model_dir")
        mapping_file = os.path.join(model_dir, "index_to_name.json")
        
        # Try to load from model directory first, then from server root
        if os.path.exists(mapping_file):
            with open(mapping_file) as f:
                self.mapping = json.load(f)
        else:
            # Fallback to server root directory
            with open("/home/model-server/index_to_name.json") as f:
                self.mapping = json.load(f)

    def postprocess(self, data):
        # data: list of tensors
        probs = torch.nn.functional.softmax(data[0], dim=1)
        top_prob, top_idx = torch.max(probs, dim=1)
        idx = top_idx.item()
        return [{
            "class_index": idx,
            "predicted_class": self.mapping[str(idx)],
            "confidence": round(top_prob.item(), 4)
        }]