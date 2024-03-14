NLP Final Project This repository contains the code for a Natural Language Processing (NLP) translation. The project focuses on machine translation using the transformers library.

Overview The project leverages the power of transformers, particularly the MT5 model, to perform translation tasks. It demonstrates how to utilize the Hugging Face transformers library for training and evaluating translation models.

Getting Started Installation You will need to install the required Python libraries to run this project. Use the following command:

bash Copy code !pip install transformers sentencepiece datasets Usage Mount Google Drive for data storage and retrieval: python Copy code drive.mount('/content/gdrive') Specify the model repository, model path, and maximum sequence length: python Copy code model_repo = 'google/mt5-base' model_path = '/content/gdrive/My Drive/mt5_translation.pt' max_seq_len = 20 Initialize the tokenizer and model: python Copy code tokenizer = AutoTokenizer.from_pretrained(model_repo) model = AutoModelForSeq2SeqLM.from_pretrained(model_repo) model = model.cuda() Data The project uses the datasets library to load a translation dataset. The dataset is loaded with the following code:

python Copy code dataset = load_dataset('alt') train_dataset = dataset['train'] test_dataset = dataset['test'] Training The project trains the translation model for a specified number of epochs. Details such as batch size, learning rate, and checkpoint frequency can be customized.

python Copy code n_epochs = 8 batch_size = 16 print_freq = 50 checkpoint_freq = 1000 lr = 5e-4 The model is trained using the following code:

python Copy code for epoch_idx in range(n_epochs): # Randomize data order data_generator = get_data_generator(train_dataset, LANG_TOKEN_MAPPING, tokenizer, batch_size)

for batch_idx, (input_batch, label_batch) in tqdm_notebook(
        enumerate(data_generator), total=n_batches):
    # ...
Evaluation The project evaluates the model using a test dataset. The evaluation is done using the following code:

python Copy code def eval_model(model, gdataset, max_iters=8): test_generator = get_data_generator(gdataset, LANG_TOKEN_MAPPING, tokenizer, batch_size) eval_losses = [] for i, (input_batch, label_batch) in enumerate(test_generator): if i >= max_iters: break

model_out = model.forward(
    input_ids = input_batch,
    labels = label_batch)
eval_losses.append(model_out.loss.item())
return np.mean(eval_losses) Visualizing Loss The loss during training is graphed using matplotlib:

python Copy code window_size = 50 smoothed_losses = [] for i in range(len(losses)-window_size): smoothed_losses.append(np.mean(losses[i:i+window_size]))

plt.plot(smoothed_losses[100:]) Translation The final part of the code translates a user-provided input:

python Copy code input_text = 'my dog is dollar' output_language = 'hi'

input_ids = encode_input_str( text = input_text, target_lang = output_language, tokenizer = tokenizer, seq_len = model.config.max_length, lang_token_map = LANG_TOKEN_MAPPING) input_ids = input_ids.unsqueeze(0).cuda()

output_tokens = model.generate(input_ids, num_beams=20, length_penalty=0.2) print(input_text + ' -> ' +
tokenizer.decode(output_tokens[0], skip_special_tokens=True)) Acknowledgements The project is built upon the powerful libraries provided by Hugging Face, particularly the transformers library.

For more information, refer to the original Colab notebook at this link.

Note: This README provides an overview of the code and its functionality. Additional details and context may be necessary for someone to fully understand and utilize the code.
