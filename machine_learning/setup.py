# -*- coding: utf-8 -*-

import tensorflow as tf
import string
import numpy as np
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.utils import to_categorical
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, LSTM, Embedding
from tensorflow.keras.preprocessing.sequence import pad_sequences
from tensorflow.keras.models import load_model
import random

song_titles = ''

with open('../machine_learning/files/songs.txt', 'r', encoding='utf-8') as file:
    song_titles = file.read()

tokens = song_titles.split()

length = 10 + 1
lines = []
for i in range(length, len(tokens)):
  seq = tokens[i - length: i] 
  line = " ".join(seq)
  lines.append(line)
  if i > 100000:
    break
# print(len(lines))


tokenizer = Tokenizer()
tokenizer.fit_on_texts(lines) # figure out, to find each unique word a number
sequences = tokenizer.texts_to_sequences(lines)

sequences = np.array(sequences)
X = sequences[:, :-1] # all columns, but the last one
y = sequences[:, -1] # the last column for y
vocab_size = len(tokenizer.word_index) + 1
y = to_categorical(y, num_classes=vocab_size)

seq_length = X.shape[1] # number of columns 

model = load_model('../machine_learning/files/songs-10Words.h5')

random_number = random.randint(0, 54460)

# this will generate a text
def generate_text_seq(model, tokenizer, text_seq_length, seed_text, n_words):
 text = []
 for _ in range(n_words):
   encoded = tokenizer.texts_to_sequences([seed_text])[0]
   encoded = pad_sequences([encoded], maxlen = text_seq_length, truncating='pre')
   y_predict = np.argmax(model.predict(encoded, verbose=0))
   # print(y_predict)
   predicted_word = ''
   for word, index in tokenizer.word_index.items():
     if index == y_predict:
       predicted_word = word
       break
   seed_text = seed_text + ' ' + predicted_word
   text.append(predicted_word)
 return ' '.join(text)
generated_song_titles = generate_text_seq(model, tokenizer, seq_length, lines[random_number], 500)

formatted_songs = generated_song_titles.split("ø") # split the string into a list of lines, using "ø" as the delimiter
formatted_songs = [line.strip() for line in formatted_songs if line] # remove leading/trailing whitespace and empty lines

# check if they already exist?
song_titles_clean = song_titles.split("ø")
song_titles_clean = [line.strip() for line in song_titles_clean if line]

formatted_songs_clean = []

for item in formatted_songs:
  if not (item in song_titles_clean):
    formatted_songs_clean.append(item)

for i, line in enumerate(formatted_songs_clean):
    print(f"{i+1}. {line}".encode('utf-8').decode('utf-8')) # print each line with a prefix number